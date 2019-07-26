import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import {
  getStudentAcamedics,
  getStudentMarks
  // getMarks,
  // getSubject
} from "./UserFunctions";

export class Profiledetails extends Component {
  state = {
    student_id: "",
    firstName: "",
    lastName: "",
    email: "",
    academics: [],
    subjects: [],
    academicData: [],
    studentMakrs: [],
    dataKeys: [],
    showTable: false,
    isDisabled: true,
    year: "",
    subject: "",
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

    // getSubject().then(res => {
    //   let subjcets = res.data;
    //   this.setState({
    //     subjects: [{ subjectid: "", subjectname: "Select Subject" }].concat(
    //       subjcets
    //     )
    //   });
    // });

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
          getStudentMarks(user2)
            .then(res => {
              if (res.status === 200) {
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

  // Component Methods
  showResult = () => {
    console.log(this.refs.academicYear.value);
    if (this.refs.academicYear.value !== "") {
      this.setState({ showTable: true });
    }
  };

  toggleDetails = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    if (this.refs.academicYear.value === "") {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };

  onSubmit = event => {
    let { student_id, year } = this.state;
    const user = {
      student_id: student_id,
      year: year
    };
    event.preventDefault();
  };

  showResult = () => {
    console.log(this.refs.academicYear.value);
    if (this.refs.academicYear.value !== "") {
      this.setState({ showTable: true });
    }
    const user2 = {
      student_id: this.state.student_id,
      academics: this.refs.academicYear.value
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
  };

  render() {
    // let test = this.state.academicData[0].map((item, key, index) => {
    //   return <th key={index}>{key + " | " + item}</th>;
    // });
    let tableRow = this.state.academicData.map((item, index) => {
      return (
        <tr key={item.examid}>
          <td>{item.subjectname}</td>
          <td>{item.examname}</td>
          <td align="center">{item.chapter1}</td>
          <td align="center">{item.chapter2}</td>
          <td align="center">{item.chapter3}</td>
          <td align="center">{item.chapter4}</td>
          <td align="center">{item.chapter5}</td>
          <td align="center">{item.chapter6}</td>
          <td align="center">{item.chapter7}</td>
          <td align="center">{item.chapter8}</td>
          <td align="center">{item.chapter9}</td>
          <td align="center">{item.chapter10}</td>
          <td align="center">
            {item.chapter1 +
              item.chapter2 +
              item.chapter3 +
              item.chapter4 +
              item.chapter5 +
              item.chapter6 +
              item.chapter7 +
              item.chapter8 +
              item.chapter9 +
              item.chapter10}
          </td>
        </tr>
      );
    });
    return (
      <>
        <div className="profile-details-cnt mt-5">
          <h1 className="mb-5 mt-0">Student Details</h1>
          <form onSubmit={this.showResult}>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-5">
                    <div className="row">
                      <label className="col-sm-4">
                        <strong>Academics:</strong>{" "}
                      </label>
                      <div className="col-sm-8">
                        <select
                          ref="academicYear"
                          onChange={this.toggleDetails}
                          name="year"
                          className="custom-select"
                        >
                          {this.state.academics.map(team => (
                            <option key={team.value} value={team.value}>
                              {team.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-5 mb-3">
                    <div className="row">
                      <label className="control-label col-sm-4">
                        <strong>Select Subject:</strong>{" "}
                      </label>
                      <div className="col-sm-8">
                        <select
                          ref="subjects"
                          onChange={this.toggleDetails}
                          name="subject"
                          className="custom-select"
                        >
                          {this.state.subjects.map(subject => (
                            <option
                              key={subject.subjectid}
                              value={subject.subjectid}
                            >
                              {subject.subjectname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-2 mb-3">
                    <input
                      disabled={this.state.isDisabled}
                      className="btn btn-md btn-block btn-primary details-btn"
                      value="Show Result"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <br />
          <table
            className={
              "table profile-detail table-responsive " +
              (this.state.showTable ? "d-block" : "d-none")
            }
          >
            <thead>
              <tr>
                <th>Subject</th>
                <th>Exam</th>
                <th>Chapter1 </th>
                <th>Chapter2 </th>
                <th>Chapter3 </th>
                <th>Chapter4 </th>
                <th>Chapter5 </th>
                <th>Chapter6 </th>
                <th>Chapter7 </th>
                <th>Chapter8 </th>
                <th>Chapter9 </th>
                <th>Chapter10 </th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>{tableRow}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Profiledetails;
