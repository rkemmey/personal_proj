import React, { useState, useEffect } from "react";
import { getProfile, getSavedPuzzles, updateDisplayName} from "../utilities";
import { useOutletContext } from "react-router-dom";

// add in option to set display name or reset password

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [savedPuzzles, setSavedPuzzles] = useState([]);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(false);
  const { user, setUser } = useOutletContext();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateDisplayName(newName);
    if (updatedUser) {
      setUser(updatedUser);  // update user info
      alert("Display name updated!");
      setEditing(false); 
    } else {
      alert("Failed to update display name.");
    }
  };

    return ( 
      <>
        <h3>Profile</h3>
        <p>Hello, {data ? user?.display_name : "Loading..."}</p>
        <div>
          <h4>Your Saved Puzzles</h4>
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
        { !editing ? (
        <>
          <button onClick={() => setEditing(true)}>Update Display Name</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
      </>
    );
  };
  
  export default ProfilePage;