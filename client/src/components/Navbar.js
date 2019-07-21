import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";

class NavBar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <>
        <Nav.Link
          href="/login"
          className={
            "nav-item " +
            (this.props.location.pathname === "/login" ? "active" : "")
          }
        >
          Sign In
        </Nav.Link>
        <Nav.Link
          href="/register"
          className={
            "nav-item " +
            (this.props.location.pathname === "/register" ? "active" : "")
          }
        >
          Register
        </Nav.Link>
      </>
    );
    const userLink = (
      <>
        <Nav.Link
          href="/profile"
          className={
            "nav-item " +
            (this.props.location.pathname === "/profile" ? "active" : "")
          }
        >
          User
        </Nav.Link>
        <Nav.Link href="/" onClick={this.logOut.bind(this)}>
          Logout
        </Nav.Link>
      </>
    );
    return (
      <>
        <Navbar bg="dark" variant="dark" className="kp-navbar">
          <Navbar.Brand href="#home">
            <Image
              src="../images/logo-icon.jpg"
              rounded
              alt="logo"
              className={
                "innerLogo " +
                (this.props.location.pathname === "/register"
                  ? "d-none"
                  : this.props.location.pathname === "/login"
                  ? "d-none"
                  : "d-inline")
              }
            />
            KPTurst - Performance Management
          </Navbar.Brand>
          <Nav className="ml-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {localStorage.usertoken ? userLink : loginRegLink}
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default withRouter(NavBar);
