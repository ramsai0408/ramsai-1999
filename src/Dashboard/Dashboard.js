import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main className="center" id="main" aria-label="main">
    <div>
      <h2>Welcome to the Dashboard!</h2>
       
      <Link to="/configure-budgets">
        <button style={{marginRight:'20px'}}>Configure Budgets</button>
      </Link>

      <Link to="/add-expense">
        <button>Manage Expenses</button>
      </Link>
    </div>
    </main>
  );
}

export default Dashboard;
