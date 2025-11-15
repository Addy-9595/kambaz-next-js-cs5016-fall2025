// app/(Kambaz)/Dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCourses } from "../Courses/reducer";
import Link from "next/link";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
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
  
  const [newCourse, setNewCourse] = useState({
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  const isFaculty = currentUser?.role === "FACULTY";

  // Course number to image mapping
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

  // Fetch courses and enrollments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (isFaculty) {
          // Faculty sees all courses
          const allCourses = await coursesClient.findAllCourses();
          dispatch(setCourses(allCourses));
        } else {
          // Students see enrolled courses
          const enrolledCourses = await coursesClient.findMyCourses();
          dispatch(setCourses(enrolledCourses));
          
          // Also get enrollment IDs for checking
          const enrollments = await enrollmentsClient.getMyEnrollments();
          setEnrolledCourseIds(enrollments.map((e: any) => e.course));
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
  }, [currentUser, isFaculty, dispatch]);

  // Enroll in a course
  const handleEnroll = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollInCourse(courseId);
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
      
      // Refresh enrolled courses
      const enrolledCourses = await coursesClient.findMyCourses();
      dispatch(setCourses(enrolledCourses));
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll in course");
    }
  };

  // Unenroll from a course
  const handleUnenroll = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to unenroll from this course?")) {
      return;
    }
    
    try {
      await enrollmentsClient.unenrollFromCourse(courseId);
      setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
      
      // Refresh enrolled courses
      const enrolledCourses = await coursesClient.findMyCourses();
      dispatch(setCourses(enrolledCourses));
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert("Failed to unenroll from course");
    }
  };

  // Add new course (faculty only)
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

  // Delete course (faculty only)
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

  // Toggle view all courses (students only)
  const handleToggleView = async () => {
    setShowAllCourses(!showAllCourses);
    
    try {
      if (!showAllCourses) {
        // Switching to all courses
        const allCourses = await coursesClient.findAllCourses();
        dispatch(setCourses(allCourses));
      } else {
        // Switching back to enrolled only
        const enrolledCourses = await coursesClient.findMyCourses();
        dispatch(setCourses(enrolledCourses));
      }
    } catch (error) {
      console.error("Error toggling view:", error);
    }
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

      {/* Faculty: Add New Course Form */}
      {isFaculty && (
        <>
          <h5>New Course</h5>
          <Row className="mb-3">
            <Col md={6}>
              <FormControl
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                className="mb-2"
              />
              <FormControl
                placeholder="Course Number (e.g., RS4550)"
                value={newCourse.number}
                onChange={(e) => {
                  const number = e.target.value;
                  setNewCourse({ 
                    ...newCourse, 
                    number,
                    image: courseImages[number] || "/images/reactjs.jpg"
                  });
                }}
                className="mb-2"
              />
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="mb-2"
              />
            </Col>
          </Row>
          <Button
            variant="primary"
            onClick={handleAddCourse}
            className="mb-4"
            id="wd-add-new-course-click"
          >
            Add Course
          </Button>
          <hr />
        </>
      )}

      {/* Header with Toggle Button for Students */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {isFaculty 
            ? `Published Courses (${courses.length})`
            : showAllCourses 
              ? `All Courses (${courses.length})`
              : `My Courses (${courses.length})`
          }
        </h2>
        
        {!isFaculty && (
          <Button
            variant={showAllCourses ? "secondary" : "primary"}
            onClick={handleToggleView}
            id="wd-toggle-courses-btn"
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="alert alert-info">
          {isFaculty
            ? "No courses created yet. Add a new course above."
            : showAllCourses 
              ? "No courses available."
              : "You are not enrolled in any courses. Click 'Show All Courses' to browse and enroll."}
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {courses.map((course: any) => {
            const isEnrolled = enrolledCourseIds.includes(course._id);
            
            return (
              <Col key={course._id}>
                <Card className="h-100">
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="text-decoration-none"
                  >
                    <Card.Img
                      variant="top"
                      src={course.image || "/images/reactjs.jpg"}
                      height={160}
                      alt={course.name}
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  
                  <Card.Body className="d-flex flex-column">
                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="text-decoration-none text-dark"
                    >
                      <Card.Title className="fs-6">{course.name}</Card.Title>
                    </Link>
                    
                    <Card.Text className="text-muted small">
                      {course.number}
                    </Card.Text>
                    
                    <Card.Text 
                      className="text-muted small flex-grow-1"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {course.description}
                    </Card.Text>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                      <Link href={`/Courses/${course._id}/Home`}>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="w-100 mb-2"
                        >
                          Go to Course
                        </Button>
                      </Link>

                      {/* Faculty: Edit/Delete */}
                      {isFaculty && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="warning"
                            size="sm"
                            className="flex-fill"
                            onClick={() => router.push(`/Courses/${course._id}/Home`)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="flex-fill"
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}

                      {/* Students: Enroll/Unenroll */}
                      {!isFaculty && showAllCourses && (
                        <div>
                          {isEnrolled ? (
                            <Button
                              variant="danger"
                              size="sm"
                              className="w-100"
                              onClick={() => handleUnenroll(course._id)}
                              id={`wd-unenroll-course-${course._id}`}
                            >
                              Unenroll
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              size="sm"
                              className="w-100"
                              onClick={() => handleEnroll(course._id)}
                              id={`wd-enroll-course-${course._id}`}
                            >
                              Enroll
                            </Button>
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