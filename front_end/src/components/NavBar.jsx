// import { Link } from "react-router-dom";

// export default function Navbar() {

//   return (
//     <nav>
//       <h1>Pixel Puzzle</h1>
//       <Link to={"/"}>Home</Link><br></br>
//       <Link to={"/sudoku/"}>Sudoku</Link><br></br>
//       <Link to={"/nonogram/"}>Nonogram</Link><br></br>
//       <Link to={"/profile/"}>Profile</Link>
//     </nav>
//   );
// }

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { userLogOut } from "../utilities";

function NavBar({ user, setUser }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/signup/">
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login/">
              Log In
            </Nav.Link>
            <Button
              variant="outline-danger"
              onClick={async () => setUser(await userLogOut())}
            >
              Log Out
            </Button>
            <Nav.Item>{user ? user.email : ""}</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;