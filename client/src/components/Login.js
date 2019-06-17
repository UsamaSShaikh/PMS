import React, { Component } from "react";
import { login } from "./UserFunctions";

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
              <img src="../images/logo.png" alt="logo" className="login-img" />
            </div>
          </div>
          <div className="col-sm-8 right-cnt">
            <div className="title">Sign In</div>
            <div className="row">
              <div className="col-md-12 selc-role">Please select your role</div>
            </div>

            <ul className="nav nav-tabs row" id="loginTabs" role="tablist">
              <li className="nav-item col-md-4">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  <div className="box">
                    <i className="fas fa-user-graduate fa-2x" />
                    <div className="box-title">Student</div>
                  </div>
                </a>
              </li>
              <li className="nav-item col-md-4">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  <div className="box">
                    <i className="fas fa-chalkboard-teacher fa-2x" />
                    <div className="box-title">Faculty</div>
                  </div>
                </a>
              </li>
              <li className="nav-item col-md-4">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  <div className="box">
                    <i className="fas fa-users fa-2x" />
                    <div className="box-title">Parent</div>
                  </div>
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
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
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <h1>Faculty</h1>
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <h1>Parents</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
