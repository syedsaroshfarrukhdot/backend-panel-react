import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
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
            <Nav.Link href="/signin">Baufinanzierung</Nav.Link>
            <Nav.Link href="/form1">Zahnzusatz</Nav.Link>
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
