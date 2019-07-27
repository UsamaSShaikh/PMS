import React, { Component } from "react";
import {
  createNewStudent,
  getStudentsDetails,
  getStudentSubjects,
  getStudentExams,
  AddStudentMarks
} from "./UserFunctions";
// import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Nav,
  Tab,
  Col,
  // Tabs,
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
      studentid: "",
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
      academics: "",
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
      error: "",
      disableForm1: false,
      disableForm2: false,
      showClearBtn1: false
    };
    this.onChange = this.onChange.bind(this);
    this.oncreateNewStudent = this.oncreateNewStudent.bind(this);
    this.onAddStudentMarks = this.onAddStudentMarks.bind(this);
    this.toggleForm1Fields = this.toggleForm1Fields.bind(this);
    this.toggleForm2Fields = this.toggleForm2Fields.bind(this);
    this.onResetForm1 = this.onResetForm1.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      id: decoded.id
    });
  }

  componentDidUpdate() {
    if (this.state.studentList.length == 0) {
      getStudentsDetails()
        .then(res => {
          if (res.status === 200) {
            //console.log(res);
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
    }
    if (this.state.examList.length == 0) {
      getStudentExams()
        .then(res => {
          if (res.status === 200) {
            //console.log(res);
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
    }
    if (this.state.subjectsList.length == 0) {
      getStudentSubjects()
        .then(res => {
          if (res.status === 200) {
            //console.log(res);
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
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleForm1Fields = () => {
    if (this.state.disableForm1 !== false) {
      this.setState({ disableForm1: false });
    } else {
      this.setState({ disableForm1: true });
    }
  };

  toggleForm2Fields = () => {
    if (this.state.disableForm2 !== false) {
      this.setState({ disableForm2: false });
    } else {
      this.setState({ disableForm2: true });
    }
  };

  oncreateNewStudent = event => {
    event.preventDefault();
    this.toggleForm1Fields();
    console.log(this.state);
    createNewStudent(this.state)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // Add Html for Student added message
          console.log("Student Added Successfully!");
          this.setState({ error: "Student Added Successfully!" });
        } else {
          if (res.status === 400) {
            console.log("Error Adding Student");
            this.setState({ error: res.data.error.original.sqlMessage });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onResetForm1 = event => {
    event.preventDefault();

    this.setState({
      id: "",
      studentid: "",
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
      academics: "",
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
      error: "",
      disableForm1: false,
      disableForm2: false,
      showClearBtn1: false
    });
  };

  onAddStudentMarks = event => {
    event.preventDefault();
    this.toggleForm2Fields();
    const studentData = {
      studentid: parseInt(this.refs.studentSelected.value),
      academicyear: this.state.academics,
      examid: parseInt(this.refs.examSelected.value),
      subjectid: parseInt(this.refs.subjectSelected.value),
      chapter1: this.state.chapter1Score,
      chapter2: this.state.chapter2Score,
      chapter3: this.state.chapter3Score,
      chapter4: this.state.chapter4Score,
      chapter5: this.state.chapter5Score,
      chapter6: this.state.chapter6Score,
      chapter7: this.state.chapter7Score,
      chapter8: this.state.chapter8Score,
      chapter9: this.state.chapter9Score,
      chapter10: this.state.chapter10Score,
      Remarks: this.state.Remarks
    };
    console.log(studentData);
    AddStudentMarks(studentData)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          // Add Html for Student added message
          console.log("Marks Added Successfully!");
          this.setState({ error: "Marks Added Successfully!" });
        } else {
          if (res.status === 400) {
            console.log("Error Adding Student Marks!");
            this.setState({ error: res.data.error.original.sqlMessage });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

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
                  <Form
                    onSubmit={this.oncreateNewStudent}
                    onReset={this.onResetForm1}
                  >
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <strong>
                            <Form.Label>Student ID:</Form.Label>
                          </strong>
                          <Form.Control
                            type="text"
                            name="studentid"
                            disabled={this.state.disableForm1}
                            value={this.state.studentid}
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
                            disabled={this.state.disableForm1}
                            value={this.state.firstName}
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
                            disabled={this.state.disableForm1}
                            value={this.state.lastName}
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
                            disabled={this.state.disableForm1}
                            value={this.state.dob}
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
                            disabled={this.state.disableForm1}
                            value={this.state.qualification}
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
                            disabled={this.state.disableForm1}
                            value={this.state.board}
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
                            disabled={this.state.disableForm1}
                            value={this.state.email}
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
                            disabled={this.state.disableForm1}
                            value={this.state.contact}
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
                            disabled={this.state.disableForm1}
                            value={this.state.fathersname}
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
                            disabled={this.state.disableForm1}
                            value={this.state.mothersname}
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
                            disabled={this.state.disableForm1}
                            value={this.state.occupation}
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
                            disabled={this.state.disableForm1}
                            value={this.state.income}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      {this.state.error ? (
                        <label>{this.state.error}</label>
                      ) : (
                        ""
                      )}
                    </Row>
                    <hr />
                    <Row>
                      <Col sm={2}>
                        <Button
                          disabled={this.state.disableForm1}
                          variant="primary"
                          className="btn btn-block"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col sm={2}>
                        <Button
                          variant="primary"
                          className="btn btn-block"
                          type="reset"
                        >
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey="addMarks">
                  <form
                    onSubmit={this.onAddStudentMarks}
                    onReset={this.onResetForm1}
                    className="mt-4"
                  >
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Academics:</Form.Label>
                          <Form.Control
                            type="text"
                            name="academics"
                            disabled={this.state.disableForm2}
                            value={this.state.academics}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Student</Form.Label>
                          <Form.Control
                            as="select"
                            ref="studentSelected"
                            disabled={this.state.disableForm2}
                            onChange={this.toggleSubjectDetails}
                            name="student"
                          >
                            {this.state.studentList.map(team => (
                              <option key={team.value} value={team.value}>
                                {team.display}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Exam</Form.Label>
                          <Form.Control
                            as="select"
                            ref="examSelected"
                            disabled={this.state.disableForm2}
                            onChange={this.toggleSubjectDetails}
                            className="custom-select"
                          >
                            {this.state.examList.map(team => (
                              <option key={team.value} value={team.value}>
                                {team.display}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Select Subject</Form.Label>
                          <Form.Control
                            as="select"
                            ref="subjectSelected"
                            disabled={this.state.disableForm2}
                            onChange={this.toggleSubjectDetails}
                            className="custom-select"
                          >
                            {this.state.subjectsList.map(team => (
                              <option key={team.value} value={team.value}>
                                {team.display}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 1</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter1Score"
                            placeholder="Chapter 1 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter1Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 2</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Chapter 2 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter2Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 3</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter3Score"
                            placeholder="Chapter 3 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter3Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 4</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter4Score"
                            placeholder="Chapter 4 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter4Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 4</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter4Score"
                            placeholder="Chapter 4 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter4Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 5</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter5Score"
                            placeholder="Chapter 5 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter5Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 6</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter6Score"
                            placeholder="Chapter 6 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter6Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 7</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter7Score"
                            placeholder="Chapter 7 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter7Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 8</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter8Score"
                            placeholder="Chapter 8 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter8Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 9</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter9Score"
                            placeholder="Chapter 9 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter9Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Chapter 10</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="chapter10Score"
                            placeholder="Chapter 10 Score"
                            disabled={this.state.disableForm2}
                            value={this.state.chapter10Score}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3}>
                        <Form.Group>
                          <Form.Label>Remarks</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="Remarks"
                            placeholder="Remarks"
                            disabled={this.state.disableForm2}
                            value={this.state.Remarks}
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Col>
                      {this.state.error ? (
                        <label>{this.state.error}</label>
                      ) : (
                        ""
                      )}
                    </Row>
                    <Row>
                      <Col sm={3}>
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={this.state.disableForm2}
                        >
                          Add Marks
                        </Button>
                        <Button variant="primary" className="ml-2" type="reset">
                          Reset
                        </Button>
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
