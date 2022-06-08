import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const AWANav = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          awalog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/stats">
              統計
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AWANav;
