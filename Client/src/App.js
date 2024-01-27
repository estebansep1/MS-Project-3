import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserModal from './Components/UserModal';
import HomePage from './Components/HomePage';
import LoginForm from './Components/LoginUser';
import RegistrationForm from './Components/RegistrationForm';
import './App.css';
import './Components/todo.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [secret, setSecret] = useState('Loading...');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/`).then((resp) => {
      setMessage(resp.data.message);
      setSecret(resp.data.secret);
    });
  }, [API_URL]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
    <HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Router>
        <Routes>
          <Route path='/' element={<UserModal />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route
            path='/'
            element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;