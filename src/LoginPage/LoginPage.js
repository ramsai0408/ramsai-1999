import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';



const LoginPage = (props) => {
  const history=useNavigate()
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

  
    axios
    .post('http://localhost:3002/login', formData)
    .then((response) => {
      setSuccessMessage(response.data.message);
      if(response.data.user) {
        localStorage.setItem('userId', (response.data.user._id.toString()));
       
      }
      localStorage.setItem('token',(response.data.token))
      login();
      setIsLoggedIn(true);
      props.callBack(true);
      history('/')
    })
    .catch((error) => {
      setError('');
      setSuccessMessage('Invalid username or password');
    })
  };



  return (
    <section style={{ textAlign: 'center', padding: '20px', position: 'relative', backgroundColor: '#f4f4f4' }}>
      <section style={{ display: 'inline-block', textAlign: 'left', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginLeft: '50px', fontSize: '20px', color: '#333333' }}>Login</h2>
        {error && <p style={{ color: '#ff0000' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="username" style={{ color: '#333333' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={{ marginTop: '10px', marginBottom: '20px', marginLeft: '5px', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <br />
          <label htmlFor="password" style={{ color: '#333333' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '10px', marginLeft: '5px', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <br />
          <button type="submit" style={{ marginLeft: '50px', fontWeight: '600', letterSpacing: '0.05em', backgroundColor: '#4caf50', color: '#ffffff', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </form>
      </section>
    </section>
  );

}
  

export default LoginPage;
