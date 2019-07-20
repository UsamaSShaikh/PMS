import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Admin extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: ""
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded.id,
      firstName: decoded.first_Name,
      lastName: decoded.last_Name,
      email: decoded.email,
      contact: decoded.contact
    });
  }

  render() {
    return (
      <div className="profile-cnt mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="mb-5">PROFILE</h1>
          </div>
          <div className="col-sm-3 text-left">
            <img src="https://dummyimage.com/150x150/ccc/fff" alt="dummy" />
          </div>
          <div className="col-md-9">
            <table className="table mx-auto">
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>{this.state.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{this.state.lastName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link className="btn btn-primary" to="/details">
                      Show Details
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
