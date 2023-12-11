// ManageExpenses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function ManageExpense() {
 // const { isLoggedIn } = useAuth();
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    categories:[]
  });
  const [expense, setExpenseAmount] = useState('');
  const [month,setmonth]=useState({
    months:['January','February','March','May','June','July','August','September','October','November','December']
  })
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [error, setError] = useState('');
  useEffect(()=>{
    setMonths(month.months)
  },[])


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
  
        const categoriesResponse = await axios.get(`http://localhost:3002/get-categories/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log("GOT USER CATEGORIES FOR SELECTED MONTH", categoriesResponse);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    if (selectedMonth) {
      fetchCategories();
    } else {
      setCategories([]);
    }
  }, [selectedMonth]);

  const handleAddExpense = async () => {
    try {
      console.log("Hello There")
      const userId = localStorage.getItem('userId');
     
      const token= localStorage.getItem('token')
      if (!selectedMonth && !selectedCategory && !expense) {
        console.error('Month, category, and expense amount are required');
        return;
      }
      await axios.post('http://localhost:3002/add-expense', {
        userId: userId,
        month: selectedMonth,
        category: selectedCategory,
        expense: parseFloat(expense),
      },
        {
          headers:
          {Authorization:`Bearer ${token}`}
      });
      console.log('Expense added successfully!');
      setExpenseAdded(true);
      setError('')
      setSelectedMonth('');
    setSelectedCategory('');
    setExpenseAmount('');
    } catch (error) {
      setExpenseAdded(false);
      setSelectedMonth('');
      setSelectedCategory('');
      setExpenseAmount('');
      setError('Error adding expense. Please try again.');
      console.error('Error adding expense:', error);
    }
  };
  const handleBack = () => {
    window.history.back();
    
  };

  return (
    <main className="center" id="main" aria-label="main">
    <div>
      <h2>Manage Expenses</h2>

      <label htmlFor="month">Month:</label>
      <select
        id="month"
        onChange={(e) => setSelectedMonth(e.target.value)}
        value={selectedMonth}
        style={{marginRight:'15px'}}
      >
        <option value="">Select Month</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
        style={{marginRight:'15px'}}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="expenseAmount">Expense Amount:</label>
      <input
        type="number"
        id="expenseAmount"
        value={expense}
        onChange={(e) => setExpenseAmount(e.target.value)}
        style={{marginRight:'15px'}}
      />
         {expenseAdded && <p>Expense added successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleAddExpense}  style={{marginRight:'15px'}}>Add Expense</button>
      <button type="button" onClick={handleBack} >
        Back
      </button>
    </div>
    </main>
  );
}

export default ManageExpense;
 