import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  getStudentAcamedics,
  getStudentSubjects,
  getStudentMarks,
  getSubjectMarks
} from "./UserFunctions";
import { Nav, Tab, Col, Tabs, Row, Table, Image } from "react-bootstrap";

class Profile extends Component {
  state = {
    student_id: "",
    firstName: "",
    lastName: "",
    email: "",
    academicsYearsList: [],
    showTable: false,
    academicData: [],
    subjectData: [],
    subjectsList: [],
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
            academicsYearsList: [
              { value: "", display: "Select academic year" }
            ].concat(teamsFromApi)
          });
          console.log(this.state.academicsYearsList);
        } else if (res.status === 400) {
          console.log("Error in academic details");
        }
      })
      .catch(err => {
        console.log(err);
      });

    getStudentSubjects()
      .then(res => {
        if (res.status === 200) {
          console.log(res);

          let teamsFromApi = res.data.map(team => {
            return { value: team.subjectid, display: team.subjectname };
          });
          this.setState({
            subjectsList: [{ value: "", display: "Select Subject" }].concat(
              teamsFromApi
            )
          });
          console.log(this.state.subjectsList);
        } else if (res.status === 400) {
          console.log("Error in finding subjects");
        }
      })
      .catch(err => {
        console.log("Error in subjects");
        console.log(err);
      });
  }

  showResult = event => {
    event.preventDefault();
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
          this.setState({ academicData: res.data, showTable: true });
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

  showSubjectsData = event => {
    event.preventDefault();
    console.log(this.refs.academicYear2.value);
    console.log(this.refs.subjectSelected.value);
    if (
      this.refs.academicYear2.value !== "" &&
      this.refs.subjectSelected.value !== ""
    ) {
      this.setState({ showTable: true });
    }
    const user2 = {
      student_id: this.state.student_id,
      academics: this.refs.academicYear2.value,
      subject: this.refs.subjectSelected.value
    };
    console.log(user2);
    getSubjectMarks(user2)
      .then(res => {
        if (res.status === 200) {
          console.log("Subject Data Found!");
          console.log(res.data);
          this.setState({ subjectData: res.data, showTable: true });
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
    let tableRow = this.state.academicData.map((item, index) => {
      return (
        <tr key={item.examname}>
          <td>{item.studentid}</td>
          <td>{item.examname}</td>
          <td align="center">{item.History}</td>
          <td align="center">{item.Geography}</td>
          <td align="center">{item.Politics}</td>
          <td align="center">{item.Economics}</td>
          <td align="center">{item.Current}</td>
          <td align="center">{item.Technology}</td>
          <td align="center">{item.Ethics}</td>
          <td align="center">{item.CSAT}</td>
          <td align="center">{item.English}</td>
          <td align="center">{item.ModLang}</td>
        </tr>
      );
    });

    let subjectRowData = this.state.subjectData.map((item, index) => {
      return (
        <tr key={item.examname}>
          <td>{item.studentid}</td>
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
        </tr>
      );
    });

    return (
      <>
        <Tab.Container id="profile-page-cnt" defaultActiveKey="profile">
          <Row className="mt-5">
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="ml-3">
                  <Nav.Link eventKey="profile">
                    <i className="mr-2 fa fa-user" />
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-3">
                  <Nav.Link eventKey="academic">
                    <i className="mr-2 fa fa-university" />
                    Academic
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-3">
                  <Nav.Link eventKey="syllabus">
                    <i className="mr-2 fa fa-book" />
                    Syllabus
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10} className="profile-cnt">
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <Row>
                    <Col sm={2}>
                      <Image
                        src="https://dummyimage.com/150x150/000/fff"
                        rounded
                      />
                    </Col>
                    <Col sm={10}>
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            {/* <th>D.O.B</th>
                            <th>Qualification</th>
                            <th>Contact Number</th>
                            <th>Father Name</th>
                            <th>Mother Name</th>
                            <th>Occupation</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{this.state.firstName}</td>
                            <td>{this.state.lastName}</td>
                            <td>{this.state.email}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="academic">
                  <Tabs defaultActiveKey="year" id="noanim-tab-example">
                    <Tab eventKey="year" title="Year Wise">
                      <form onSubmit={this.showResult} className="mt-4">
                        <div className="row">
                          <label className="col-sm-2">
                            <strong>Academics:</strong>{" "}
                          </label>
                          <div className="col-sm-4">
                            <select
                              ref="academicYear"
                              onChange={this.toggleDetails}
                              name="year"
                              className="custom-select"
                            >
                              {this.state.academicsYearsList.map(team => (
                                <option key={team.value} value={team.value}>
                                  {team.display}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-3 mb-3">
                            <input
                              disabled={this.state.isDisabled}
                              className="btn btn-md btn-block btn-primary details-btn"
                              value="Show Result"
                              type="submit"
                            />
                          </div>
                        </div>
                      </form>
                      <div className="table-cnt">
                        <table
                          className={
                            "table profile-detail striped bordered " +
                            (this.state.showTable ? "d-table" : "d-none")
                          }
                        >
                          <tbody>
                            <tr>
                              <th>Student Id</th>
                              <th>Exam</th>
                              <th>History</th>
                              <th>Geography</th>
                              <th>Politics</th>
                              <th>Economics</th>
                              <th>Current</th>
                              <th>Technology</th>
                              <th>Ethics</th>
                              <th>CSAT</th>
                              <th>English</th>
                              <th>ModLang</th>
                            </tr>
                            {tableRow}
                          </tbody>
                        </table>
                      </div>
                    </Tab>
                    <Tab eventKey="chapter" title="Chapter Wise">
                      <form onSubmit={this.showSubjectsData} className="mt-4">
                        <div className="row">
                          <label className="col-sm-2">
                            <strong>Academics:</strong>{" "}
                          </label>
                          <div className="col-sm-4">
                            <select
                              ref="academicYear2"
                              onChange={this.toggleDetails}
                              name="year"
                              className="custom-select"
                            >
                              {this.state.academicsYearsList.map(team => (
                                <option key={team.value} value={team.value}>
                                  {team.display}
                                </option>
                              ))}
                            </select>
                            <select
                              ref="subjectSelected"
                              onChange={this.toggleDetails}
                              name="subject"
                              className="custom-select"
                            >
                              {this.state.subjectsList.map(team => (
                                <option key={team.value} value={team.value}>
                                  {team.display}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-3 mb-3">
                            <input
                              disabled={this.state.isDisabled}
                              className="btn btn-md btn-block btn-primary details-btn"
                              value="Show Details"
                              type="submit"
                            />
                          </div>
                        </div>
                      </form>
                      <div className="table-cnt">
                        <table
                          className={
                            "table profile-detail striped bordered " +
                            (this.state.showTable ? "d-table" : "d-none")
                          }
                        >
                          <tbody>
                            <tr>
                              <th>Student Id</th>
                              <th>Exam</th>
                              <th>Chapter 1</th>
                              <th>Chapter 2</th>
                              <th>Chapter 3</th>
                              <th>Chapter 4</th>
                              <th>Chapter 5</th>
                              <th>Chapter 6</th>
                              <th>Chapter 7</th>
                              <th>Chapter 8</th>
                              <th>Chapter 9</th>
                              <th>Chapter 10</th>
                            </tr>
                            {subjectRowData}
                          </tbody>
                        </table>
                      </div>
                    </Tab>
                  </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="syllabus">
                  <h1>syllabus Test</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}

export default Profile;
