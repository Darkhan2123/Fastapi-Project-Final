import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup', formData);
      alert('Signup successful! You can now log in.');
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      alert('Failed to signup.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md items-center">
            <h1 className='text-center mb-4'>Welcome Back!</h1>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:shadow-outline"
            />
            <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Signup</button>
            <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-green-500 hover:text-green-800">Login</Link></p>
        </form>
    </div>
  );
};

export default Signup;
