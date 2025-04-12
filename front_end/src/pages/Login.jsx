import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/user/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Log In</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required /> 
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign In</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;
