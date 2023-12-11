import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import HomePage from "./HomePage/HomePage";
import Menu from "./Menu/Menu";
import AboutPage from "./AboutPage/AboutPage";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard/Dashboard";
import ConfigureBudgets from "./ConfigureBudgets/ConfigureBudgets";
import ManageExpense from "./ConfigureBudgets/ManageExpense";
import Visuals from "./ConfigureBudgets/visuals";
import { useEffect, useRef, useState } from "react";
import TokenExpirationPopup from "./TokenExpiration";
import axios from "axios";
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const intervalIdRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  


useEffect(() => {
  const isLogdIn = localStorage.getItem('isLoggedIn') === 'true';
  console.log("CHECK", isLogdIn);
  if (isLogdIn) {
    const storedExpirationTime = parseInt(localStorage.getItem('expirationTime'), 10);
    if (storedExpirationTime && storedExpirationTime > Date.now()) {

      intervalIdRef.current = setInterval(() => {
        console.log("CHEDKING", storedExpirationTime, Date.now());
        const remainingTime = storedExpirationTime - Date.now();
        
        if (remainingTime <= 0) {
         
          handleLogout();
        } else if (remainingTime <= 20000) {
         
          setShowPopup(true);
        }
      }, 1000); 
    }
  }

  return () => clearInterval(intervalIdRef.current);
}, [isLoggedIn]);



const handleRefresh = () => {

  const newExpirationTime = Date.now() + 60000; 
  setShowPopup(false);

 
  localStorage.setItem('expirationTime', newExpirationTime.toString());
  const userId=localStorage.getItem('userId')
  
 
  clearInterval(intervalIdRef.current);
  const newIntervalId = setInterval(() => {
    console.log("CHEDKING222", newExpirationTime, Date.now());
    const remainingTime = newExpirationTime - Date.now();
   
    axios.post(`http://localhost:3002/refresh-token/${userId}`)
    .then((res)=>{
      const newtoken=res.data.token
      console.log(newtoken)
      localStorage.setItem('token',newtoken)
    })
    if (remainingTime <= 0) {
     
      handleLogout();
    } else if (remainingTime <= 20000) {
      
      setShowPopup(true);
    }
  }, 1000); 
  intervalIdRef.current = newIntervalId;
};

const handleLogout = () => {
  
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('token')
  localStorage.removeItem('userId')

  window.location.href = '/login'
};

const setLoggedIn = (flag) => {
  setIsLoggedIn(flag);
}


  return (
    <AuthProvider>
      <Router>
        <Menu  />
        <Hero />
        <div className="mainContainer">
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage callBack={setLoggedIn} />} />
            <Route path="/configure-budgets" element={<ConfigureBudgets />} />
            <Route path="/add-expense" element={<ManageExpense />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Visual" element={<Visuals />} />
          </Routes>
        </div>
        {showPopup && (
          <TokenExpirationPopup
            onRefresh={handleRefresh}
            onClose={handleLogout}
          />
        )}

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
