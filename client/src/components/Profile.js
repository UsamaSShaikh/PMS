import React, { Component } from "react";
import { getStudentAcamedics, getStudentMarks } from "./UserFunctions";
import jwt_decode from "jwt-decode";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
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
    this.showResult = this.showResult.bind(this);
    this.createData = this.createData.bind(this);
  }

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
            student_id: this.state
              .student_id /*,
            academics: this.state.academics*/
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
        } else {
          if (res.status === 400) {
            console.log("Error in academic details");
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  };

  showResult() {}

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
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
                <td>Academics</td>
                <td>
                  {
                    <select>
                      {this.state.academics.map(team => (
                        <option key={team.value} value={team.value}>
                          {team.display}
                        </option>
                      ))}
                    </select>
                  }
                  <button
                    className="btn btn-md btn-primary"
                    onClick={this.showResult}
                  >
                    Show Result
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <Paper className={this.state.root}>
            <Table className={this.state.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Subjects</TableCell>
                  <TableCell align="right">History</TableCell>
                  <TableCell align="right">Geography</TableCell>
                  <TableCell align="right">Politics</TableCell>
                  <TableCell align="right">Economics</TableCell>
                  <TableCell align="right">Current</TableCell>
                  <TableCell align="right">Technology</TableCell>
                  <TableCell align="right">Ethics</TableCell>
                  <TableCell align="right">CSAT</TableCell>
                  <TableCell align="right">English</TableCell>
                  <TableCell align="right">ModLang</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.academicData.map(row => (
                  <TableRow key={row.examname}>
                    <TableCell component="th" scope="row">
                      {row.examname}
                    </TableCell>
                    <TableCell align="right">{row.History}</TableCell>
                    <TableCell align="right">{row.Geography}</TableCell>
                    <TableCell align="right">{row.Politics}</TableCell>
                    <TableCell align="right">{row.Economics}</TableCell>
                    <TableCell align="right">{row.Current}</TableCell>
                    <TableCell align="right">{row.Technology}</TableCell>
                    <TableCell align="right">{row.Ethics}</TableCell>
                    <TableCell align="right">{row.CSAT}</TableCell>
                    <TableCell align="right">{row.English}</TableCell>
                    <TableCell align="right">{row.ModLang}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Profile;
