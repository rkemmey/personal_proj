import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { userLogIn } from "../utilities";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loggedInUser = await userLogIn(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate('/profile');  //redirect
    } else {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <>
      <h1>LogIn</h1>
      <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
    </>
  );
};

export default Login;
