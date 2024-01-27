import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginRegistration.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post(`${API_URL}/register`, {
      username: username,
      password: password,
    })
    .then((response) => {
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
    });
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
            onChange={(e) => setUsername(e.target.value)} // Use the handleInputChange function
          />
        </div>
        <div>
          <label className='input'>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Use the handleInputChange function
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