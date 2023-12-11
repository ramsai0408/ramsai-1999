const express = require("express");
const app = express();
const cors = require("cors");
const compression = require('compression');
const jwt=require('jsonwebtoken')
// const { expressjwt: exjwt } = require('express-jwt');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const SignupSchema = require("./models/SignupModel");
const BudgetSchema = require("./models/BudgetModel");
const ExpenseSchema = require("./models/ExpenseModel");
let url = "mongodb://127.0.0.1:27017/personal-budget";

const bcrypt = require("bcrypt");
const port = 3002;
const budget = require("./server.json");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const secretkey='This is my key'
// const jwtMW = exjwt({
//   secret: secretkey,
//   algorithms: ['HS256']
// });

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}



app.use("/", express.static("public"));
app.get("/intro", (req, res) => {
  res.send("Hello world");
});

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.get("/get-categories/:userId", async (req, res) => {
  // const userId = localStorage.getItem('userId');
  const { userId } = req.params;
  const { month } = req.query;

  try {
    let query = { userId };
    if (month) {
      query.months = month;
    }

    const categories = await BudgetSchema.distinct('category', query);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-budgets/:userId', async (req, res) => {
  const { userId } = req.params;
  const { month } = req.query; 

  try {
    let query = { userId };
    if (month) {
      query.months = month; 
    }

    const bud = await BudgetSchema.find(query);
    res.json(bud);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-expenses/:userId',  async (req, res) => {
  const { userId } = req.params;
  const { month } = req.query;

  try {
    let query = { userId };
    if (month) {
      query.month = month; 
    }

    const exp = await ExpenseSchema.find(query);
    res.json(exp);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    secretkey,
    { expiresIn: "1m" }
  );
};

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await SignupSchema.findOne({ username });
   // console.log("HERE GOT RESULTS OF USER", user);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // if(user) {
    //   localStorage.setItem('userId', user._id.toString());
    // }
    const passwordMatch = await bcrypt.compare(password, user.Password);
   // console.log("HERE compared password OF USER", user._id);
    if (passwordMatch) {
     // console.log("HERE sending response", user);
    //  let token = jwt.sign(
    //   { id: user._id, username: user.username },
    //   secretkey,
    //   { expiresIn: "60s" }
    // );
    let token = generateToken(user);
      return res.json({ success: true, message: "Login successful", user: user ,token:token});
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post("/Signup", async (req, res) => {
  const { username, password } = req.body;
  const Password = await encryptPassword(password);
  try {
    const existingUser = await SignupSchema.findOne({ $or: [{ username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already in use" });
    }
    const newUser = new SignupSchema({ username, Password });
    await newUser.save();

    res.json({ success: true, message: "User successfully registered" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/configure-budgets", async (req, res) => {
  const { userId, months, budgetList } = req.body;
 // console.log("======================",months)
  try {
    if (!budgetList || !Array.isArray(budgetList) || budgetList.length === 0) {
      return res.status(400).json({ error: "Invalid budget list" });
    }

    const budgets = budgetList.map(({ category, budget }) => ({ userId, category, budget ,months}));
    await BudgetSchema.insertMany(budgets);
   

    res.json({ success: true, message: "Budgets saved successfully" });
  } catch (error) {
    console.error("Error saving budgets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/add-expense", async (req, res) => {
  const {userId, month, category, expense } = req.body;
  // const userId = localStorage.getItem('userId');
  try {
    const newExpense = new ExpenseSchema({ userId, month, category, expense });
    await newExpense.save();

    res.json({ success: true, message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Cannot add expense" });
  }
});

app.get("/check-existing-budget/:userId/:month/:category", async (req, res) => {
  const { userId, month, category } = req.params;

  try {
    const existingBudget = await BudgetSchema.findOne({ userId, months: month, category });

    if (existingBudget) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking existing budget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/refresh-token/:userId",async(req,res)=>{
  const {userId}=req.params
  console.log(userId)
  const user = await SignupSchema.findById(userId);
  console.log(user)
      const newtoken=generateToken(user)
  res.json({token:newtoken})
})

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
