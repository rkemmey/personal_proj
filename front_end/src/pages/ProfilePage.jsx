import React, { useState, useEffect } from "react";
import { getProfile, getSavedPuzzles} from "../utilities";

// add in option to set display name or reset password

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [savedPuzzles, setSavedPuzzles] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setData(data)
      console.log(data);
    };
  
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchSavedPuzzles = async () => {
      const puzzles = await getSavedPuzzles();
      if (puzzles) {
        setSavedPuzzles(puzzles);  
      }
    };

    fetchSavedPuzzles();
    console.log(savedPuzzles)
  }, []); // empty array runs once after initial render

    return ( 
      <>
        <h1>Profile</h1>
        <p>Hello, {data ? data.display_name : "Loading..."}</p>
        <div>
          <h2>Your Saved Puzzles</h2>
          <ul>
            {savedPuzzles.length === 0 ? (
              <li>No saved puzzles to continue.</li>
            ) : (
              savedPuzzles.map(puzzle => (
                <li key={puzzle.id}>
                  <a href={`/${puzzle.content_type === 1 ? 'sudoku' : 'nonogram'}/${puzzle.object_id}`}>Continue Puzzle {puzzle.object_id}</a>
                </li>
              ))
            )}
          </ul>
        </div>
      </>
    );
  };
  
  export default ProfilePage;