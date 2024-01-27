import axios from 'axios';
import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

import './LoginRegistration.css';

function LoginUser({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  // const navigate = useNavigate();

  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post(`${API_URL}/login`, {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log('Successfully logged in!');
      console.log(response);
      localStorage.setItem('token', response.data.token);
      // navigate("/todos");
      onLoginSuccess();
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
      <button class="button-17" type="submit">Login</button>
    </form>
  );
}

export default LoginUser;

