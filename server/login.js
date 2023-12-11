const mongoose=require('mongoose')
const loginModel=require('./models/loginModel')
let url='mongodb://localhost:27017/personal-budget'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>{
            console.log("Connected to Db")
    
            let newdata=new loginModel({id:100,Name:"LK inserted by mongoose"})
    
            loginModel.insertMany(newdata)
                        .then((data)=>{
                            console.log(data)
                            mongoose.connection.close()
                        })
                        .catch((conerr)=>{
                            console.log(conerr)
                        })
                  
        })
        .catch((conerr)=>{
            console.log(conerr)
        })