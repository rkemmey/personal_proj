import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
      <>
        <h1>Home Page</h1>
        <Link to="/login">Click here to Login</Link><br></br>
        <Link to="/signup">Click here to create an account</Link>
      </>
    );
  };
  
  export default HomePage;