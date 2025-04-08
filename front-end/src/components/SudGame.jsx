import React, { useEffect, useState } from "react";
import { api } from "../utilities";
import SudGrid from "./SudGrid";


function SudGame() {
    const [puzzle, setPuzzle] = useState(null);
    const [solution, setSolution] = useState(null);
    //const [loading, setLoading] = useState(true);
    

    //if (loading) return <p>Loading puzzle...</p>;

    const test_connection = async () => {
        let response = await api.get("sudoku/");
        let data = response.data
        console.log(data);

        try {
            let puzzleArr = data.newboard.grids[0] // TODO: possibly store difficulty
            setPuzzle(puzzleArr['value']);
            setSolution(puzzleArr['solution']);
            //setLoading(false);
        }
        catch (error) {
            console.error("Error fetching puzzle:", error)
        }
      };
      
      useEffect(() => {
        test_connection();
      }, []);

      useEffect(() => {
        if (puzzle !== null) {
            console.log("Updated puzzle:", puzzle);
        }
    }, [puzzle]);

    return (
        puzzle !== null && <SudGrid puzzle={puzzle} solution={solution}/>
    )
}

export default SudGame;