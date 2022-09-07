import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  disabledStats?: boolean;
};

const AWANav = (props: Props) => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          awalog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/stats" disabled={props.disabledStats}>
              戦績
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AWANav;
