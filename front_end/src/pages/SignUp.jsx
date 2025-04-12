import React, { useState } from 'react';
//import { api } from "../utilities";
import axios from 'axios';

function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/user/signup/', form);
      setMessage('Account created! You can now sign in.');
    } catch (error) {
      setMessage('Sign up failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

export default SignUp;
