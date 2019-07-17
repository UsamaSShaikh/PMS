import React, { Component } from "react";
import { login } from "./UserFunctions";
import { Nav, Tab } from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      password: "",
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      student_id: this.state.student_id,
      password: this.state.password
    };
    login(user)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.props.history.push("profile");
        } else {
          if (res.status === 400) {
            console.log("Login Error");
            this.setState({ error: res.data.message });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="login-overlay">
        <div className="login-cnt">
          <div className="col-sm-4 left-cnt">
            <div className="logo-cnt">
              <img
                src="../images/logo-icon.jpg"
                alt="logo"
                className="login-img"
              />
              <h5>Knowledge Part Charitable Trust</h5>
            </div>
          </div>
          <div className="col-sm-8 right-cnt">
            <div className="title">Sign In</div>
            <div className="row">
              <div className="col-md-12 selc-role">Please select your role</div>
            </div>

            <Tab.Container id="left-tabs-example" defaultActiveKey="SignIn">
              <Nav variant="pills" id="loginTabs">
                <Nav.Item>
                  <Nav.Link eventKey="SignIn">
                    <div className="box">
                      <i className="fas fa-user-graduate fa-2x" />
                      <div className="box-title">Student</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="faculty">
                    <div className="box">
                      <i className="fas fa-chalkboard-teacher fa-2x" />
                      <div className="box-title">Faculty</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="parent">
                    <div className="box">
                      <i className="fas fa-users fa-2x" />
                      <div className="box-title">Parent</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="admin">
                    <div className="box">
                      <i className="fas fa-user fa-2x" />
                      <div className="box-title">Admin</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="SignIn">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="student_id">Student ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="student_id"
                        placeholder="Enter Student ID"
                        value={this.state.student_id}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                    </div>
                    {this.state.error ? <label>{this.state.error}</label> : ""}
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block mt-3 login-btn"
                    >
                      Sign In
                    </button>
                  </form>
                </Tab.Pane>
                <Tab.Pane eventKey="faculty">
                  <h1>faculty</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="parent">
                  <h1>parent</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="admin">
                  <h1>admin</h1>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
