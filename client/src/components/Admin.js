import React, { Component } from "react";
import { createNewStudent } from "./UserFunctions";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Nav, Tab, Col, Tabs, Row, Table, Image } from "react-bootstrap";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      studentid: "",
      firstName: "",
      lastName: "",
      dob: '',
      qualification: "",
      board: "",
      email: "",
      contact: "",
      fathersname: "",
      mothersname: "",
      occupation: "",
      income: "",
      error: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.oncreateNewStudent = this.oncreateNewStudent.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded.id
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  oncreateNewStudent = (event) => {
    event.preventDefault();
    console.log(this.state)
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
                  <form onSubmit={this.oncreateNewStudent}>
                    <label>
                      Student ID:
                        <input type="text" name="studentid" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      First Name:
                        <input type="text" name="firstName" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Last Name:
                        <input type="text" name="lastName" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      DOB:
                        <input type="text" name="dob" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Qualification:
                        <input type="text" name="qualification" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Board:
                        <input type="text" name="board" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Email:
                        <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Contact:
                        <input type="text" name="contact" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Father's Name:
                        <input type="text" name="fathersname" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Mother's Name:
                        <input type="text" name="mothersname" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Occupation:
                        <input type="text" name="occupation" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                      Family Income:
                        <input type="text" name="income" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </Tab.Pane>
                <Tab.Pane eventKey="addMarks"></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </>
    );
  }
}

export default Admin;
