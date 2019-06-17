import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { getStudentAcamedics, getStudentMarks } from "./UserFunctions";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";

export class Profiledetails extends Component {
  state = {
    student_id: "",
    firstName: "",
    lastName: "",
    email: "",
    academics: [],
    selectedYear: "",
    academicData: [],
    showTable: false,
    root: {
      width: "100%",
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
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

    getStudentAcamedics(user)
      .then(res => {
        if (res.status === 200) {
          let teamsFromApi = res.data.map(team => {
            return { value: team.academicyear, display: team.academicyear };
          });
          this.setState({
            academics: [{ value: "", display: "Select academic year" }].concat(
              teamsFromApi
            )
          });
          const user2 = {
            student_id: this.state.student_id
          };
          console.log(user2);
          getStudentMarks(user2)
            .then(res => {
              if (res.status === 200) {
                console.log("Marksheet Data Found!");
                console.log(res.data);
                this.setState({ academicData: res.data });
              } else {
                if (res.status === 400) {
                  console.log("Error in marksheet");
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (res.status === 400) {
          console.log("Error in academic details");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  showResult = () => {
    console.log(this.refs.academicYear.value);
    if (this.refs.academicYear.value !== "") {
      this.setState({ showTable: true });
    }
  };
  render() {
    return (
      <div className="profile-details-cnt mt-5">
        <h1 className="mb-5 mt-0">Student Details</h1>
        <div className="row">
          <div className="col-md-6  mx-auto">
            <div className="row">
              <div className="col-md-4">
                <label>
                  <strong>Academics:</strong>{" "}
                </label>
              </div>
              <div className="col-md-8 mb-3">
                <div className="input-group">
                  {
                    <select ref="academicYear" className="custom-select">
                      {this.state.academics.map(team => (
                        <option key={team.value} value={team.value}>
                          {team.display}
                        </option>
                      ))}
                    </select>
                  }
                  <div className="input-group-append">
                    <button
                      className="btn btn-md btn-primary"
                      onClick={this.showResult}
                    >
                      Show Result
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table
          className={
            "table profile-detail " +
            (this.state.showTable ? "d-table" : "d-none")
          }
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Exam</th>
              <th scope="col">History</th>
              <th scope="col">Geography</th>
              <th scope="col">Politics</th>
              <th scope="col">Economics</th>
              <th scope="col">Current</th>
              <th scope="col">Technology</th>
              <th scope="col">Ethics</th>
              <th scope="col">CSAT</th>
              <th scope="col">English</th>
              <th scope="col">ModLang</th>
            </tr>
          </thead>
          <tbody>
            {this.state.academicData.map(row => (
              <tr key={row.examname}>
                <td>{row.examname}</td>
                <td align="left">{row.History}</td>
                <td align="left">{row.Geography}</td>
                <td align="left">{row.Politics}</td>
                <td align="left">{row.Economics}</td>
                <td align="left">{row.Current}</td>
                <td align="left">{row.Technology}</td>
                <td align="left">{row.Ethics}</td>
                <td align="left">{row.CSAT}</td>
                <td align="left">{row.English}</td>
                <td align="left">{row.ModLang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profiledetails;
