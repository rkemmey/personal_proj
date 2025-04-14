// import React, { useState } from 'react';
// //import { api } from "../utilities";
// import axios from 'axios';

// function SignUp() {
//   const [form, setForm] = useState({ username: '', email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/user/signup/', form);
//       setMessage('Account created! You can now sign in.');
//     } catch (error) {
//       setMessage('Sign up failed. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSignUp}>
//       <h2>Sign Up</h2>
//       <input name="username" placeholder="Username" onChange={handleChange} required />
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Sign Up</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// export default SignUp;

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext } from "react-router-dom";
import { userRegistration } from "../utilities";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await userRegistration(email, password);
    if (user) {
        setUser(user)
    }
  }

  return (
    <>
      <h1>SignUp</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
