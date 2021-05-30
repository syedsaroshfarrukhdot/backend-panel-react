import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import userService from "../services/userService";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Backend</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/formTwo">Baufinanzierung</Nav.Link>
            <Nav.Link href="/form1">Zahnzusatz</Nav.Link>
            <Nav.Link href="/mcmakler">McMakler</Nav.Link>
            <NavDropdown title="Phone Numbers" id="basic-nav-dropdown">
              <NavDropdown.Item href="/phonenumberform2">
                Baufinanzierung
              </NavDropdown.Item>
              <NavDropdown.Item href="/phonenumberform">
                Zahnzusatz
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <Button
              variant="outline-info"
              onClick={() => {
                history.push("/signin");
                userService.logout();
              }}
            >
              Logout
            </Button>
          </Form>
        </Navbar>
        <br />
      </Router>
    </>
  );
};

export default withRouter(Header);
