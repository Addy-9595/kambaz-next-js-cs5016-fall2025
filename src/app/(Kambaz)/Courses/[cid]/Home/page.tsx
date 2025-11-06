"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Modules from "../Modules/page";

export default function Home() {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  // You can use the 'course' object as needed within this component
  return (
    <div id="wd-home">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary me-2">Collapse All</button>
        <button className="btn btn-secondary me-2">View Progress</button>
        <div className="dropdown d-inline">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Publish All
          </button>
        </div>
        <button className="btn btn-danger ms-2">+ Module</button>
      </div>
      <Modules />
    </div>
  );
}