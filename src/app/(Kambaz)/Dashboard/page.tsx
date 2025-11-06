"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/reactjs.jpg",
    description: "New Description"
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  const isFaculty = currentUser?.role === "FACULTY";

  const filteredCourses = isFaculty
    ? courses
    : showAllCourses
    ? courses
    : courses.filter((c: any) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === c._id
        )
      );

  const handleAddCourse = () => {
    console.log("🚀 Add button clicked!");
    dispatch(addNewCourse(course));
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/reactjs.jpg",
      description: "New Description"
    });
  };

  const handleUpdateCourse = () => {
    if (course._id === "0") {
      alert("Please select a course to update by clicking Edit first!");
      return;
    }
    dispatch(updateCourse(course));
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="primary"
              className="float-end"
              onClick={handleAddCourse}
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <FormControl
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            as="textarea"
            rows={3}
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
        {!isFaculty && (
          <Button
            variant="primary"
            className="float-end"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "Show My Courses" : "Enrollments"}
          </Button>
        )}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {filteredCourses.map((c: any) => (
            <Col key={c._id}>
              <Card className="h-100">
                <Link 
                  href={`/Courses/${c._id}/Home`} 
                  className="text-decoration-none"
                >
                  <Card.Img 
                    variant="top" 
                    src={c.image || "/reactjs.jpg"}
                    style={{ 
                      height: "150px", 
                      objectFit: "cover" 
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Link 
                    href={`/Courses/${c._id}/Home`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Title className="fs-6">{c.name}</Card.Title>
                  </Link>
                  <Card.Text 
                    className="text-muted small flex-grow-1"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    {c.description}
                  </Card.Text>
                  
                  <div className="mt-auto">
                    <Link href={`/Courses/${c._id}/Home`}>
                      <Button variant="primary" size="sm" className="w-100 mb-2">
                        Go
                      </Button>
                    </Link>
                    
                    {isFaculty && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          className="flex-fill"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-fill"
                          onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm(`Delete ${c.name}?`)) {
                              dispatch(deleteCourse(c._id));
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}