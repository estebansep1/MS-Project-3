import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginRegistration.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Update the URL to your backend server
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: username,
        password: password,
      });

      // Assuming the backend returns a success message or user ID
      console.log(response.data);

      // Navigate to the login page or any other page
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='align'>
        <div>
          <label className='input'>Username:</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className='input'>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className='button-17' type='submit'>
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;

