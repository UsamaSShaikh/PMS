import React, { Component } from "react";
import { createNewStudent, getStudentsDetails, getStudentSubjects, getStudentExams, AddStudentMarks } from "./UserFunctions";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Nav,
  Tab,
  Col,
  Tabs,
  Row,
  Table,
  Image,
  Form,
  Button
} from "react-bootstrap";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      dob: "",
      qualification: "",
      board: "",
      email: "",
      contact: "",
      fathersname: "",
      mothersname: "",
      occupation: "",
      income: "",
      studentList: [],
      examList: [],
      subjectsList: [],
      chapter1Score: 0,
      chapter2Score: 0,
      chapter3Score: 0,
      chapter4Score: 0,
      chapter5Score: 0,
      chapter6Score: 0,
      chapter7Score: 0,
      chapter8Score: 0,
      chapter9Score: 0,
      chapter10Score: 0,
      Remarks: "",
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.oncreateNewStudent = this.oncreateNewStudent.bind(this);
    this.onAddStudentMarks = this.onAddStudentMarks.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded.id
    });

    getStudentsDetails()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          let teamsFromApi = res.data.map(team => {
            return { value: team.studentid, display: team.firstName };
          });
          this.setState({
            studentList: [{ value: "", display: "Select Student" }].concat(
              teamsFromApi
            )
          });
          console.log(this.state.studentList);
        } else if (res.status === 400) {
          console.log("Error in finding student details");
        }
      })
      .catch(err => {
        console.log("Error in student details");
        console.log(err);
      });

    getStudentExams()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          let teamsFromApi = res.data.map(team => {
            return { value: team.examid, display: team.examname };
          });
          this.setState({
            examList: [{ value: "", display: "Select Exam" }].concat(
              teamsFromApi
            )
          });
          console.log(this.state.examList);
        } else if (res.status === 400) {
          console.log("Error in finding exams");
        }
      })
      .catch(err => {
        console.log("Error in exams");
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  oncreateNewStudent = event => {
    event.preventDefault();
    console.log(this.state);
    createNewStudent(this.state)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // Add Html for Student added message
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

  onAddStudentMarks = (event) => {
    event.preventDefault();
    const studentData = {
      studentid: parseInt(this.refs.studentSelected.value),
      academicyear: this.state.academics,
      examid: parseInt(this.refs.examSelected.value),
      subjectid: parseInt(this.refs.subjectSelected.value),
      chapter1: this.state.chapter1Score,
      chapter2: this.state.chapter1Score,
      chapter3: this.state.chapter1Score,
      chapter4: this.state.chapter1Score,
      chapter5: this.state.chapter1Score,
      chapter6: this.state.chapter1Score,
      chapter7: this.state.chapter1Score,
      chapter8: this.state.chapter1Score,
      chapter9: this.state.chapter1Score,
      chapter10: this.state.chapter1Score,
      Remarks: this.state.Remarks
    }
    console.log(studentData)
    AddStudentMarks(studentData)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // Add Html for Student added message
          console.log("Marks Added Successfully!")
          this.setState({ error: "Marks Added Successfully!" });
        } else {
          if (res.status === 400) {
            console.log("Error Adding Student Marks!");
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
                  <Nav.Link eventKey="addUser">
                    <i className="mr-2 fa fa-university" />
                    Add User
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-3">
                  <Nav.Link eventKey="addMarks">
                    <i className="mr-2 fa fa-book" />
                    Add Marks
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
                <Tab.Pane eventKey="addUser">
                  <Form onSubmit={this.oncreateNewStudent}>
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Student ID:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="studentid"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>First Name:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Last Name:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>DOB:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="dob"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Qualification:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="qualification"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Board:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="board"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Email:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="email"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Contact:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="contact"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Father's Name:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="fathersname"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Mother's Name:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="mothersname"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Occupation:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="occupation"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Family Income:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="income"
                            value={this.state.value}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm={2}>
                        <Button
                          variant="primary"
                          className="btn btn-block"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey="addMarks">
                  <form onSubmit={this.onAddStudentMarks} className="mt-4">
                    <Row>
                      <label className="col-sm-2">
                        <strong>Academics:</strong>{" "}
                      </label>
                      <Col sm={3}>
                        <input type="text" name="academics" value={this.state.value} onChange={this.onChange} />
                      </Col>
                      <Col sm={3}>
                        <select
                          ref="studentSelected"
                          onChange={this.toggleSubjectDetails}
                          name="student"
                          className="custom-select"
                        >
                          {this.state.studentList.map(team => (
                            <option key={team.value} value={team.value}>
                              {team.display}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col sm={3}>
                        <select
                          ref="examSelected"
                          onChange={this.toggleSubjectDetails}
                          name="exam"
                          className="custom-select"
                        >
                          {this.state.examList.map(team => (
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
                        <label htmlFor="chapter1">Chapter 1</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter1Score"
                          placeholder="Chapter 1 Score"
                          value={this.state.chapter1Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter2">Chapter 2</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter2Score"
                          placeholder="Chapter 2 Score"
                          value={this.state.chapter2Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter3">Chapter 3</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter3Score"
                          placeholder="Chapter 3 Score"
                          value={this.state.chapter3Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter4">Chapter 4</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter4Score"
                          placeholder="Chapter 4 Score"
                          value={this.state.chapter4Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter5">Chapter 5</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter5Score"
                          placeholder="Chapter 5 Score"
                          value={this.state.chapter5Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter6">Chapter 6</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter6Score"
                          placeholder="Chapter 6 Score"
                          value={this.state.chapter6Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter7">Chapter 7</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter7Score"
                          placeholder="Chapter 7 Score"
                          value={this.state.chapter7Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter8">Chapter 8</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter8Score"
                          placeholder="Chapter 8 Score"
                          value={this.state.chapter8Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter9">Chapter 9</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter9Score"
                          placeholder="Chapter 9 Score"
                          value={this.state.chapter9Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="chapter10">Chapter 10</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chapter10Score"
                          placeholder="Chapter 10 Score"
                          value={this.state.chapter10Score}
                          onChange={this.onChange}
                        />
                        <label htmlFor="remarks">Remarks</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Remarks"
                          placeholder="Remarks"
                          value={this.state.Remarks}
                          onChange={this.onChange}
                        />
                        {this.state.error ? <label>{this.state.error}</label> : ""}
                      </Col>
                      <Col sm={3}>
                        <input
                          disabled={this.state.isSubjectBtnDisabled}
                          className="btn btn-md btn-block btn-primary details-btn"
                          value="Add Marks"
                          type="submit"
                        />
                      </Col>
                    </Row>
                  </form>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}

export default Admin;
