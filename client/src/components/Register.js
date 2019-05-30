import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      email: "",
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

    register(user).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.props.history.push(`/login`);
      } else {
        if (res.status === 400) {
          console.log("Registration Failed!");
          this.setState({ error: res.data.message });
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Please Enter Details
              </h1>
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
              {this.state.error ? <label>{this.state.error}</label> : <label />}
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
