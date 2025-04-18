import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  // return (
  //   <div className="container text-center my-5">
  //     <h1 className="display-4 text-info">Welcome to the Home Page</h1>
  //     <p className="lead text-muted">Please log in or create an account to get started.</p>
  //     <div className="d-flex justify-content-center gap-4 mt-4">
  //       <Link to="/login" className="btn btn-info btn-lg">Login</Link>
  //       <Link to="/signup" className="btn btn-outline-info btn-lg">Create Account</Link>
  //     </div>
  //   </div>
  // );
  return (
    <div className="container text-center my-5">
      <h1 className="display-4" style={{ color: '#8b4cad' }}>
        Welcome to the Home Page
      </h1>
      <p className="lead text-muted">
        Please log in or create an account to get started.
      </p>

      <div className="d-flex justify-content-center gap-4 mt-4">
        <Link
          to="/login"
          className="btn btn-lg"
          style={{
            backgroundColor: '#8b4cad',
            color: '#fff',
            border: 'none',
          }}
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="btn btn-outline btn-lg"
          style={{
            border: '2px solid #8b4cad',
            color: '#8b4cad',
          }}
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
