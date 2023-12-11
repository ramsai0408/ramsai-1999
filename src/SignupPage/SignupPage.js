import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignupPage() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    axios
    .post('http://localhost:3002/Signup', formData)
    .then((response) => {
      setSuccessMessage(response.data.message);
      setError('');
      history('/login')
    })
    .catch((error) => {
      setError('Error signing up. Please try again.');
      setSuccessMessage('');
    })
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px',position:'relative' }}>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <label htmlFor="username" >Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          style={{marginTop:'10px',marginBottom:'20px',marginLeft:'5px'}}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{marginBottom:'15px',marginLeft:'5px'}}
          required
        />
        <br />

        <button type="submit" style={{fontWeight:'600',letterSpacing:'0.05em'}}>Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
