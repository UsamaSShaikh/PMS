import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  getStudentAcamedics,
  getStudentSubjects,
  getStudentMarks,
  getSubjectMarks,
  getStudentStandard,
  getSyllabusData
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
    showSubjectTable: false,
    showSyllabusTable: false,
    academicData: [],
    subjectData: [],
    syllabusData: [],
    subjectsList: [],
    standardsList: [],
    isyearBtnDisabled: true,
    isSubjectBtnDisabled: true,
    isSylSubmitBtnDisabled: true,
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
  }

  componentDidUpdate() {
    if (this.state.academicsYearsList.length === 0) {
      getStudentAcamedics(this.state.student_id)
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
    }

    if (this.state.subjectsList.length === 0) {
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

    if (this.state.standardsList.length === 0) {
      getStudentStandard()
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            let teamsFromApi = res.data.map(team => {
              return { value: team.standardid, display: team.year };
            });
            this.setState({
              standardsList: [{ value: "", display: "Select Standard" }].concat(
                teamsFromApi
              )
            });
            console.log(this.state.standardsList);
          } else if (res.status === 400) {
            console.log("Error in finding standards");
          }
        })
        .catch(err => {
          console.log("Error in standards");
          console.log(err);
        });
    }
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
      this.setState({ showSubjectTable: true });
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
          this.setState({ subjectData: res.data, showSubjectTable: true });
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

  showSyllabusData = event => {
    event.preventDefault();
    console.log(this.refs.academicYear3.value);
    console.log(this.refs.standardSelected.value);
    console.log(this.refs.sylSubjectSelected.value);
    if (
      this.refs.academicYear3.value !== "" &&
      this.refs.standardSelected.value !== "" &&
      this.refs.sylSubjectSelected.value !== ""
    ) {
      this.setState({ showSyllabusTable: true });
    }
    const user2 = {
      academics: this.refs.academicYear3.value,
      standard: this.refs.standardSelected.value,
      subject: this.refs.sylSubjectSelected.value
    };
    console.log(user2);
    getSyllabusData(user2)
      .then(res => {
        if (res.status === 200) {
          console.log("Syllabus Data Found!");
          this.setState({ syllabusData: res.data, showSyllabusTable: true });
          console.log(this.state.syllabusData)
        } else {
          if (res.status === 400) {
            console.log("Error in Syllabus Data");
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleDetails = () => {
    if (this.refs.academicYear.value !== "") {
      this.setState({ isyearBtnDisabled: false });
    } else {
      this.setState({ isyearBtnDisabled: true, showTable: false });
    }
  };

  toggleSubjectDetails = event => {
    if (
      this.refs.academicYear2.value !== "" &&      
      this.refs.subjectSelected.value !== ""
    ) {
      this.setState({ isSubjectBtnDisabled: false });
    } else {
      this.setState({ showSubjectTable: false, isSubjectBtnDisabled: true });
    }
  };

  toggleSyllabusBtn = event => {
    if (
      this.refs.academicYear3.value !== "" &&
      this.refs.standardSelected.value !== "" &&
      this.refs.sylSubjectSelected.value !== ""
    ) {
      this.setState({ isSylSubmitBtnDisabled: false });
    } else {
      this.setState({ showSyllabusTable: false, isSylSubmitBtnDisabled: true });
    }
  };

  render() {
    let tableRow = this.state.academicData.map((item, index) => {
      return (
        <tr key={item.examname}>
          {/* <td>{item.studentid}</td> */}
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

    let syllabusRowData = this.state.syllabusData.map((item, index) => {
      return (
        <tr key={item.srno}>
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
                      <Table striped bordered>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>                            
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
                          <Col sm={2}>
                            <label>
                              <strong>Academics:</strong>{" "}
                            </label>
                          </Col>
                          <Col sm={4}>
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
                          </Col>
                          <Col sm={2}>
                            <input
                              disabled={this.state.isyearBtnDisabled}
                              className="btn btn-md btn-block btn-primary details-btn"
                              value="Show Result"
                              type="submit"
                            />
                          </Col>
                        </div>
                      </form>
                      <div className="table-cnt">
                        <Table
                          striped
                          bordered
                          variant="dark"
                          className={
                            "mt-4 " +
                            (this.state.showTable ? "d-table" : "d-none")
                          }
                        >
                          <tbody>
                            <tr>
                              {/* <th>Student Id</th> */}
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
                        </Table>
                      </div>
                    </Tab>
                    <Tab eventKey="chapter" title="Chapter Wise">
                      <form onSubmit={this.showSubjectsData} className="mt-4">
                        <Row>
                          <label className="col-sm-2">
                            <strong>Academics:</strong>{" "}
                          </label>
                          <Col sm={3}>
                            <select
                              ref="academicYear2"
                              onChange={this.toggleSubjectDetails}
                              name="year"
                              className="custom-select"
                            >
                              {this.state.academicsYearsList.map(team => (
                                <option key={team.value} value={team.value}>
                                  {team.display}
                                </option>
                              ))}
                            </select>
                          </Col>
                          <Col sm={3}>
                            <select
                              ref="subjectSelected"
                              onChange={this.toggleSubjectDetails}
                              name="subject"
                              className="custom-select"
                            >
                              {this.state.subjectsList.map(team => (
                                <option key={team.value} value={team.value}>
                                  {team.display}
                                </option>
                              ))}
                            </select>
                          </Col>
                          <Col sm={3}>
                            <input
                              disabled={this.state.isSubjectBtnDisabled}
                              className="btn btn-md btn-block btn-primary details-btn"
                              value="Show Details"
                              type="submit"
                            />
                          </Col>
                        </Row>
                      </form>
                      <div className="table-cnt">
                        <Table
                          striped
                          bordered
                          variant="dark"
                          className={
                            "mt-4 " +
                            (this.state.showSubjectTable ? "d-table" : "d-none")
                          }
                        >
                          <tbody>
                            <tr>
                              {/* <th>Student Id</th> */}
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
                        </Table>
                      </div>
                    </Tab>
                  </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="syllabus">
                  <form onSubmit={this.showSyllabusData} className="mt-4">
                    <Row>
                      <label className="col-sm-2">
                        <strong>Academics:</strong>{" "}
                      </label>
                      <Col sm={3}>
                        <select
                          ref="academicYear3"
                          onChange={this.toggleSyllabusBtn}
                          name="year"
                          className="custom-select"
                        >
                          {this.state.academicsYearsList.map(team => (
                            <option key={team.value} value={team.value}>
                              {team.display}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col sm={3}>
                        <select
                          ref="standardSelected"
                          onChange={this.toggleSyllabusBtn}
                          name="standard"
                          className="custom-select"
                        >
                          {this.state.standardsList.map(team => (
                            <option key={team.value} value={team.value}>
                              {team.display}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col sm={3}>
                        <select
                          ref="sylSubjectSelected"
                          onChange={this.toggleSyllabusBtn}
                          name="subject"
                          className="custom-select"
                        >
                          {this.state.subjectsList.map(team => (
                            <option key={team.value} value={team.value}>
                              {team.display}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col sm={3}>
                        <input
                          disabled={this.state.isSylSubmitBtnDisabled}
                          className="btn btn-md btn-block btn-primary details-btn"
                          value="Show Syllabus"
                          type="submit"
                        />
                      </Col>
                    </Row>
                  </form>
                  <div className="table-cnt">
                    <Table
                      striped
                      bordered
                      variant="dark"
                      className={
                        "mt-4 " +
                        (this.state.showSyllabusTable ? "d-table" : "d-none")
                      }
                    >
                      <tbody>
                        {syllabusRowData}
                      </tbody>
                    </Table>
                  </div>
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
