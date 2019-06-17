import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getStudentAcamedics, getStudentMarks } from "./UserFunctions";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  state = {
    student_id: "",
    firstName: "",
    lastName: "",
    email: "",
    academics: [],
    selectedYear: "",
    academicData: [],
    root: {
      width: "100%",
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  };

  showAcademic = () => {
    this.history.push("/details", this.state);
  };

  createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const user = decoded.student_id;

    console.log("Profile : " + user);
    this.setState({
      student_id: decoded.student_id,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email
    });
  }

  showResult() {}

  render() {
    return (
      <div className="profile-cnt mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="mb-5">PROFILE</h1>
          </div>
          <div className="col-sm-3 text-left">
            <img
              src="https://dummyimage.com/150x150/ccc/fff"
              alt="dummy image"
            />
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
                  <td colspan="2">
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

export default Profile;
