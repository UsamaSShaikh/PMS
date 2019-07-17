import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Nav, Tab, Col, Row, Table, Image } from "react-bootstrap";

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

    console.log(decoded);
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
                  <Row className="mt-3">
                    <Col sm={12}>
                      <Link className="btn btn-primary" to="/details">
                        Show Details
                      </Link>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="academic">
                  <h1>academic Test</h1>
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
