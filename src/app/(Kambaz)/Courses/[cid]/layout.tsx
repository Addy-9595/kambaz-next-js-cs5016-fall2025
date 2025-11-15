"use client";
import { ReactNode } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import CoursesNavigation from "./Navigation";
import ProtectedRoute from "../../Account/ProtectedRoute";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  return (
    <ProtectedRoute>
      <div id="wd-courses">
        <h2 className="text-danger">
          <div className="wd-kambaz-course-link">
            {course && course.name} &gt; {course && course.number}
          </div>
        </h2>
        <hr />
        <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>
          <div className="flex-fill">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}