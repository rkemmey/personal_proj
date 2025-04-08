import React, { useEffect, useState } from "react";
import { api } from "../utilities";


function SudGame() {
    const test_connection = async () => {
        let response = await api.get("sudoku/");
        console.log(response.data);
      };
      
      useEffect(() => {
        test_connection();
      }, []);

    const [puzzle, setPuzzle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [grid, setGrid] = useState([]); // User's grid
    const [message, setMessage] = useState(""); // Validation message

}

export default SudGame;