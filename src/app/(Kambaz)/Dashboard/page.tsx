import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import Link from "next/link";
import * as db from "../Database";

export default function Dashboard() {
    const courses = db.courses;
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses
          (14)</h2> <hr />
            <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4">
                {courses.map((course) => (
                  <Col key={course._id} className="wd-dashboard-course"
                    style={{ width: "300px" }}>
                    <Card>
                      <Link href={`/Courses/${course._id}/Home`}
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg src={course.image}
                                variant="top" width="100%" height={160} />
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                {course.name}
                            </CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                {course.description}
                            </CardText>
                            <Button variant="primary">Go</Button>
                        </CardBody>
                      </Link>
                    </Card>
                  </Col>
                ))}

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link 
                            href={`/Courses/1234/Home`}
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                            <div style={{ height: 160, backgroundColor: "#4CAF50" }}></div>
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS5610 Web Development
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                    Learn modern web development
                                </CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link 
                            href="/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                            <div style={{ height: 160, backgroundColor: "#2196F3" }}></div>
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS5010 Program Design
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                    Object-oriented programming
                                </CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link 
                            href="/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                            <div style={{ height: 160, backgroundColor: "#FF9800" }}></div>
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS5800 Algorithms
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                    Advanced algorithms and data structures
                                </CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link 
                            href="/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                            <div style={{ height: 160, backgroundColor: "#9C27B0" }}></div>
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS3500 Object-Oriented Design
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                    Design patterns and principles
                                </CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link 
                            href="/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                            <div style={{ height: 160, backgroundColor: "#F44336" }}></div>
                            <CardBody>
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS4500 Software Development
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                    Large-scale software projects
                                </CardText>
                                <Button variant="primary">Go</Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link 
                            href="/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <div style={{ height: 160, backgroundColor: "#009688" }}></div>
                            <CardBody className="card-body">
                                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS6200 Database Management
                                </CardTitle>
                                <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                    Relational and NoSQL databases
                                </CardText>
                                <Button variant="primary"> Go </Button>
                            </CardBody>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
    );
}