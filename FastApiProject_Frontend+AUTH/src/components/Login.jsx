import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', credentials);

    if (!credentials.username || !credentials.password) {
        alert('Both username and password are required!');
        return;
    }

    // Construct form data
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    try {
        const response = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/token',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setToken(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
        alert('Login successful!');
    } catch (error) {
        console.error('Login error:', error.response?.data);
        alert('Failed to login. Please check your username and password.');
    }
};

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className='text-center mb-4'>Welcome</h1>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
        <p className="mt-4 text-center">Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-800">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;
