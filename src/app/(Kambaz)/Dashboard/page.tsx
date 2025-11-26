"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCourses } from "../Courses/reducer";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl, Modal } from "react-bootstrap";
import ProtectedRoute from "../Account/ProtectedRoute";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";

export const dynamic = 'force-dynamic';

function DashboardContent() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  
  const [newCourse, setNewCourse] = useState({
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  const isFaculty = currentUser?.role === "FACULTY";

  const courseImages: { [key: string]: string } = {
    "RS4550": "/images/rocket-propulsion.jpg",
    "RS4560": "/images/aerodynamics.jpg",
    "RS4570": "/images/spacecraft-design.jpg",
    "CH1230": "/images/organic-chemistry.jpg",
    "CH1240": "/images/inorganic-chemistry.jpg",
    "CH1250": "/images/physical-chemistry.jpg",
    "ME101": "/images/ancient-languages.jpg",
    "ME102": "/images/wizards-elves-men.jpg",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (isFaculty) {
          const allCourses = await coursesClient.findAllCourses();
          dispatch(setCourses(allCourses));
        } else {
          if (showAllCourses) {
            const allCourses = await coursesClient.findAllCourses();
            const enrollments = await enrollmentsClient.getMyEnrollments();
            setEnrolledCourseIds(enrollments.map((e: any) => e.course));
            dispatch(setCourses(allCourses));
          } else {
            const enrolledCourses = await coursesClient.findMyCourses();
            dispatch(setCourses(enrolledCourses));
            setEnrolledCourseIds(enrolledCourses.map((c: any) => c._id));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser, isFaculty, showAllCourses, dispatch]);

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollInCourse(courseId);
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
      
      if (!showAllCourses) {
        const enrolledCourses = await coursesClient.findMyCourses();
        dispatch(setCourses(enrolledCourses));
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll in course");
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to unenroll from this course?")) {
      return;
    }
    
    try {
      await enrollmentsClient.unenrollFromCourse(courseId);
      setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
      
      if (!showAllCourses) {
        const enrolledCourses = await coursesClient.findMyCourses();
        dispatch(setCourses(enrolledCourses));
      }
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert("Failed to unenroll from course");
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.name || !newCourse.number) {
      alert("Please enter course name and number");
      return;
    }

    try {
      const courseWithImage = {
        ...newCourse,
        image: courseImages[newCourse.number] || "/images/reactjs.jpg"
      };
      
      const created = await coursesClient.createCourse(courseWithImage);
      dispatch(setCourses([...courses, created]));
      
      setNewCourse({
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        description: "",
        image: "/images/reactjs.jpg",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course");
    }
  };

  const handleEditClick = (course: any) => {
    setEditingCourse({ ...course });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async () => {
    if (!editingCourse.name || !editingCourse.number) {
      alert("Please enter course name and number");
      return;
    }

    try {
      const courseWithImage = {
        ...editingCourse,
        image: courseImages[editingCourse.number] || editingCourse.image || "/images/reactjs.jpg"
      };

      await coursesClient.updateCourse(courseWithImage._id, courseWithImage);
      dispatch(setCourses(courses.map((c: any) => c._id === courseWithImage._id ? courseWithImage : c)));
      setShowEditModal(false);
      setEditingCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await coursesClient.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  const handleToggleView = () => {
    setShowAllCourses(!showAllCourses);
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course</h5>
          <Row className="mb-3">
            <Col md={6}>
              <FormControl
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                className="mb-2"
              />
              <FormControl
                placeholder="Course Number (e.g., RS4550)"
                value={newCourse.number}
                onChange={(e) => {
                  const number = e.target.value;
                  setNewCourse({ ...newCourse, number, image: courseImages[number] || "/images/reactjs.jpg" });
                }}
                className="mb-2"
              />
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="mb-2"
              />
            </Col>
          </Row>
          <Button variant="primary" onClick={handleAddCourse} className="mb-4">
            Add Course
          </Button>
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          {isFaculty ? `Published Courses (${courses.length})` : showAllCourses ? `All Courses (${courses.length})` : `My Courses (${courses.length})`}
        </h2>
        
        {!isFaculty && (
          <Button variant={showAllCourses ? "secondary" : "primary"} onClick={handleToggleView}>
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {courses.length === 0 ? (
        <div className="alert alert-info">
          {isFaculty ? "No courses created yet. Add a new course above." : showAllCourses ? "No courses available." : "You are not enrolled in any courses. Click 'Show All Courses' to browse and enroll."}
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course: any) => {
            const isEnrolled = enrolledCourseIds.includes(course._id);
            
            return (
              <Col key={course._id}>
                <Card className="h-100">
                  <Link href={`/Courses/${course._id}/Home`} className="text-decoration-none">
                    <Card.Img variant="top" src={course.image || "/images/reactjs.jpg"} height={160} alt={course.name} style={{ objectFit: "cover" }} />
                  </Link>
                  
                  <Card.Body className="d-flex flex-column">
                    <Link href={`/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                      <Card.Title className="fs-6">{course.name}</Card.Title>
                    </Link>
                    
                    <Card.Text className="text-muted small">{course.number}</Card.Text>
                    
                    <Card.Text className="text-muted small flex-grow-1" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {course.description}
                    </Card.Text>

                    <div className="mt-auto">
                      <Link href={`/Courses/${course._id}/Home`}>
                        <Button variant="primary" size="sm" className="w-100 mb-2">Go to Course</Button>
                      </Link>

                      {isFaculty && (
                        <div className="d-flex gap-2">
                          <Button variant="warning" size="sm" className="flex-fill" onClick={(e) => { e.preventDefault(); handleEditClick(course); }}>Edit</Button>
                          <Button variant="danger" size="sm" className="flex-fill" onClick={() => handleDeleteCourse(course._id)}>Delete</Button>
                        </div>
                      )}

                      {!isFaculty && showAllCourses && (
                        <div>
                          {isEnrolled ? (
                            <Button variant="danger" size="sm" className="w-100" onClick={() => handleUnenroll(course._id)}>Unenroll</Button>
                          ) : (
                            <Button variant="success" size="sm" className="w-100" onClick={() => handleEnroll(course._id)}>Enroll</Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingCourse && (
            <>
              <FormControl
                placeholder="Course Name"
                value={editingCourse.name}
                onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                className="mb-2"
              />
              <FormControl
                placeholder="Course Number"
                value={editingCourse.number}
                onChange={(e) => {
                  const number = e.target.value;
                  setEditingCourse({ ...editingCourse, number, image: courseImages[number] || editingCourse.image });
                }}
                className="mb-2"
              />
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Description"
                value={editingCourse.description || ""}
                onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                className="mb-2"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateCourse}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}