import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav>
      <h1>Pixel Puzzle</h1>
      <Link to={"/"}>Home</Link><br></br>
      <Link to={"/sudoku/"}>Sudoku</Link><br></br>
      <Link to={"/nonogram/"}>Nonogram</Link><br></br>
      <Link to={"/profile/"}>Profile</Link>
    </nav>
  );
}