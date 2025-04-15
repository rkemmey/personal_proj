import React, { useEffect, useState } from "react";
import { api } from "../utilities";
import NonoGrid from "./NonoGrid";
import { useParams } from "react-router-dom";


function NonoGame() {
    const [solution, setSolution] = useState(null);
    const [rowhint, setRowhint] = useState(null);
    const [colhint, setColhint] = useState(null);
    const { id } = useParams();

    const test_connection = async () => {
        let response = await api.get(`nonogram/puzzle/${id}/`);
        let data = response.data
        console.log(data);
    
        try {
            setSolution(data.solution);
            setRowhint(data.row_hints)
            setColhint(data.column_hints)
        }   
        catch (error) {
            console.error("Error fetching puzzle:", error)
        }
      };
      
      useEffect(() => {
        test_connection();
      }, []);

      useEffect(() => {
        if (solution !== null) {
            console.log("Solution:", solution);
        }
    }, [solution]);

    return (
        solution !== null && <NonoGrid rowhint={rowhint} colhint={colhint} solution={solution}/>
    )
}

export default NonoGame;