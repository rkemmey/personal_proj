import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/nonogram/"; // Ensure Django API is running

function NonoGame() {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState([]); // User's grid
  const [message, setMessage] = useState(""); // Validation message

  // Fetch Nonogram puzzle from Django API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setPuzzle(data);
        setGrid(Array(data.size).fill().map(() => Array(data.size).fill(0))); // Initialize empty grid
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching puzzle:", error));
  }, []);

  // Toggle cell state (0 = empty, 1 = filled, 2 = marked as X)
  const toggleCell = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]); // Deep copy the grid
      newGrid[row][col] = (newGrid[row][col] + 1) % 3; // Cycle between 0 → 1 → 2
      return newGrid;
    });
  };

  // Check if user's grid matches the correct solution
  const validateSolution = () => {
    const flattenedGrid = grid.flat();  // Flatten grid for comparison
    const flattenedSolution = puzzle.solution.flat(); // Flatten correct solution

    if (JSON.stringify(flattenedGrid) === JSON.stringify(flattenedSolution)) {
      setMessage("✅ Correct! You solved the Nonogram!");
    } else {
      setMessage("❌ Incorrect. Keep trying!");
    }
  };

  if (loading) return <p>Loading puzzle...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Nonogram {puzzle.size}x{puzzle.size}</h2>

      <div style={{ display: "inline-block" }}>
        
        {/* Column Hints Row */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
          <div style={{ width: "50px" }} />  {/* Placeholder for row hints */}
          
          {/* Column Hints */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${puzzle.size}, 30px)`, gap: "0px" }}>
            {puzzle.column_hints.map((hint, index) => (
              <div key={index} style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center", 
                fontWeight: "bold", 
                minHeight: "60px",
                width: "30px",
                whiteSpace: "pre-line"
              }}>
                {hint.length > 0 ? hint.join("\n") : "."}
              </div>
            ))}
          </div>
        </div>

        {/* Grid with Row Hints */}
        <div style={{ display: "flex" }}>
          {/* Row Hints */}
          <div style={{ display: "grid", gridTemplateRows: `repeat(${puzzle.size}, 30px)`, gap: "0px", marginRight: "5px" }}>
            {puzzle.row_hints.map((hint, index) => (
              <div key={index} style={{ 
                textAlign: "right", 
                fontWeight: "bold", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "50px",
                height: "30px"
              }}>
                {hint.length > 0 ? hint.join(" ") : "."}
              </div>
            ))}
          </div>

          {/* Clickable Grid */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${puzzle.size}, 30px)`, gridTemplateRows: `repeat(${puzzle.size}, 30px)`, gap: "0px" }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div 
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    cursor: "pointer",
                    backgroundColor: cell === 1 ? "black" : "white",  // Filled cell
                    color: cell === 2 ? "red" : "black" // "X" mark in red
                  }}
                >
                  {cell === 2 ? "X" : ""}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit Button & Validation Message */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={validateSolution} style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px"
          }}>
            Submit
          </button>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: message.includes("Correct") ? "green" : "red" }}>
            {message}
          </p>
        </div>

      </div>
    </div>
  );
}

export default NonoGame;
