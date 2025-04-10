import React, { useState, useEffect } from "react";
import "../App.css";

const NonoGrid = ({ rowhint, colhint, solution }) => {
    const [board, setBoard] = useState(solution);
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const initialGrid = Array(solution.length).fill().map(() => Array(solution.length).fill(0));
        setGrid(initialGrid);
      }, [solution.length]);

    // Toggle cell state (0 = empty, 1 = filled, 2 = marked as X)
    const toggleCell = (row, col) => {
        setGrid((prevGrid) => {
        const newGrid = prevGrid.map((r) => [...r]); // Deep copy the grid
        newGrid[row][col] = (newGrid[row][col] + 1) % 3; // Cycle between 0 → 1 → 2
        return newGrid;
        });
    };

    return (
        <div
          className="grid-wrapper"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${solution.length + 1}, 30px)`,
            gridTemplateRows: `repeat(${solution.length + 1}, 30px)`,
          }}
        >
          {/* Empty top-left corner */}
          <div className="hint-cell" />
    
          {/* Column hints */}
          {colhint.map((col, colIndex) => (
            <div key={`colhint-${colIndex}`} className="hint-cell vertical">
              {col.map((num, i) => (
                <div key={i}>{num}</div>
              ))}
            </div>
          ))}
    
          {/* Row hints + actual grid */}
          {grid.map((row, rowIndex) => (
            <>
              {/* Row hint */}
              <div key={`rowhint-${rowIndex}`} className="hint-cell">
                {rowhint[rowIndex].join(" ")}
              </div>
    
              {/* Grid row */}
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className={`cell ${cell === 1 ? "filled" : ""} ${
                    cell === 2 ? "marked" : ""
                  }`}
                >
                  {cell === 2 ? "X" : ""}
                </div>
              ))}
            </>
          ))}
        </div>
      );

    // return (
    //     <div className="grid" style={{ gridTemplateColumns: `repeat(${solution.length}, 30px)`, gridTemplateRows: `repeat(${solution.length}, 30px)` }}>
    //         {grid.map((row, rowIndex) =>
    //             row.map((cell, colIndex) => (
    //         <div
    //             key={`${rowIndex}-${colIndex}`}
    //             onClick={() => toggleCell(rowIndex, colIndex)}
    //             className={`cell ${cell === 1 ? "filled" : ""} ${cell === 2 ? "marked" : ""}`}
    //         >
    //             {cell === 2 ? "X" : ""}
    //         </div> ))
    //         )}
    //     </div>
    // )
}

export default NonoGrid;