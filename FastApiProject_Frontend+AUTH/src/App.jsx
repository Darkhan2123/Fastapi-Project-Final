import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { AuthContext } from './AuthContext';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={token ? <Navigate replace to="/" /> : <Login setToken={setToken} />} />
            <Route path="/signup" element={token ? <Navigate replace to="/" /> : <Signup />} />
            <Route path="/" element={token ? <Home onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
