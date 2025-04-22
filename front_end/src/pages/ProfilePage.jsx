import React, { useState, useEffect } from "react";
import { getProfile, getSavedPuzzles, updateDisplayName} from "../utilities";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

// add in option to reset password

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
        <div className="main-page-contents px-3 py-3">
        <h3 className="display-5 fw-semibold" style={{ color: '#8b4cad' }}>Hello, {data ? user?.display_name : "Loading..."}</h3>
        <div className="rounded p-3">
          <h4>Your Saved Puzzles</h4>
          <ul>
            {savedPuzzles.length === 0 ? (
              <li>You don't currently have any saved puzzles.</li>
            ) : (
              savedPuzzles.map(puzzle => (
                <li key={puzzle.id}>
                  <a href={`/${puzzle.content_type === 1 ? 'sudoku' : 'nonogram'}/${puzzle.object_id}`} className="custom-link">Continue Puzzle {puzzle.object_id}</a>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded p-3">
          <h5>Learn How to Play</h5>
          <ul>
            <li><Link to="/about-sudoku" className="custom-link">Learn How to Play Sudoku</Link></li>
            <li><Link to="/about-nonogram" className="custom-link">Learn How to Play Nonogram</Link></li>
          </ul>
        </div>

        { !editing ? (
        <>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditing(true)}>Update Display Name</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-success">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
      </div>
      </>
    );
  };
  
  export default ProfilePage;