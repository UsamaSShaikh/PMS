import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Details from "./components/Details";
import "./App.css";

import NavBar from "./components/Navbar";
// import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Admin from "./components/Admin";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Login} />
          <div className="container-fluid">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/details" component={Details} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
