import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4 fw-semibold" style={{ color: '#8b4cad' }}>
        Welcome to Pixel Puzzles!
      </h1>
      <div className="rounded p-3 mb-4">
        <p className="mb-0">
      Pixel Puzzles bridges the gap between casual relaxation and mental challenge by providing 
      an expansive library of nonogram and sudoku puzzles, with multiple difficulty levels, 
      and progress tracking. Whether you're a beginner or a seasoned solver, our platform makes 
      it easy to dive into the world of nonograms and experience the joy of uncovering pixel-perfect art through logic.
        </p>
      </div>

          <div className="row mb-4">
      <div className="col-md-6 mb-3">
        <Link to="/about-sudoku" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Learn About Sudoku</h5>
              <p className="card-text">
                Explore the history, rules, and strategies behind the classic logic game of Sudoku.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-6 mb-3">
        <Link to="/about-nonogram" className="text-decoration-none text-dark">
          <div className="card h-100 bg-light shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Learn About Nonograms</h5>
              <p className="card-text">
                Discover how to solve nonograms and uncover pixel art using logic and numerical clues.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>


      <p className="mb-0">
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
