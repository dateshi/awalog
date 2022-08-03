import classNames from "classnames";
import Nav from "react-bootstrap/Nav";

const Sidebar = () => (
  <Nav className={classNames("flex-column", "sidebar")}>
    <Nav.Link href="/home">Active</Nav.Link>
    <Nav.Link eventKey="link-1">Link</Nav.Link>
    <Nav.Link eventKey="link-2">Link</Nav.Link>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
    </Nav.Link>
  </Nav>
);

export default Sidebar;
