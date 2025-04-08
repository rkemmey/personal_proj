import React, { useState } from "react";
import "../App.css";

const SudGrid = ({ puzzle }) => {
    const [board, setBoard] = useState(puzzle);

    const handleChange = (row, col, value) => {
        const updatedBoard = board.map((r, rowIndex) => // loop through each row -- map(element, index, array)
            r.map((cell, colIndex) => { // loop through each column
                if (rowIndex === row && colIndex === col) { // if this was the cell that was changed (indices match)
                    const num = parseInt(value, 10); // string to num
                    return isNaN(num) ? 0 : Math.min(9, Math.max(1, num));
                }
                return cell;
            })
        );
        setBoard(updatedBoard);
    };

    return (
        <div className="sudoku-grid">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isEditable = cell === 0;
                    return (
                        <input
                            key={`${rowIndex}-${colIndex}`} //unique key for each cell
                            value={cell === 0 ? "" : cell}
                            onChange={event =>
                                isEditable &&
                                handleChange(rowIndex, colIndex, event.target.value)
                            }
                            readOnly={!isEditable}
                            className={`sudoku-cell ${
                                isEditable ? "editable" : "clue"
                            }`}
                        />
                    );
                })
            )}
        </div>
    );
};

export default SudGrid;
