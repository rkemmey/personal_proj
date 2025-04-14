// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/user/login', form);
//       const token = res.data.token;
//       localStorage.setItem('token', token);
//       setMessage('Login successful!');
//     } catch (error) {
//       setMessage('Login failed. Please check your credentials.');
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Log In</h2>
//       <input name="email" placeholder="Email" onChange={handleChange} required /> 
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Sign In</button>
//       <p>{message}</p>
//     </form>
//   );
// }

// export default Login;

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext } from "react-router-dom";
import { userLogIn } from "../utilities";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();

  return (
    <>
      <h1>LogIn</h1>
      <Form
        onSubmit={async (e) => [
          e.preventDefault(),
          setUser(await userLogIn(email, password)),
        ]}
      >
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

export default Login;
