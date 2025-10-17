"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignments } from "../../../Database";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
    const { cid } = useParams();
    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === cid
    );

    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                    id="wd-search-assignment"
                    className="form-control w-50"
                    placeholder="Search..."
                />
                <div>
                    <button id="wd-add-assignment-group" className="btn btn-secondary me-2">
                        <BsPlus className="fs-4" /> Group
                    </button>
                    <Link
                        href={`/Courses/${cid}/Assignments/new`}
                        id="wd-add-assignment"
                        className="btn btn-danger"
                    >
                        <BsPlus className="fs-4" /> Assignment
                    </Link>
                </div>
            </div>

            <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-assignments-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                        <div>
                            <BsGripVertical className="me-2 fs-3" />
                            ASSIGNMENTS
                        </div>
                        <div>
                            <span className="badge rounded-pill bg-light text-dark border border-dark me-2">
                                40% of Total
                            </span>
                            <BsPlus className="fs-4" />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>

                    <ul className="wd-assignment-list list-group rounded-0">
                        {courseAssignments.map((assignment) => (
                            <li
                                key={assignment._id}
                                className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <div>
                                        <Link
                                            href={`/Courses/${cid}/Assignments/${assignment._id}`}
                                            className="wd-assignment-link text-dark text-decoration-none fw-bold"
                                        >
                                            {assignment.title}
                                        </Link>
                                        <div className="text-danger small">
                                            Multiple Modules | Not available until{" "}
                                            {new Date(assignment.availableFrom).toLocaleDateString()} |
                                            <br />
                                            Due {new Date(assignment.dueDate).toLocaleDateString()} at{" "}
                                            {new Date(assignment.dueDate).toLocaleTimeString()} |{" "}
                                            {assignment.points} pts
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FaCheckCircle className="text-success me-2 fs-5" />
                                    <IoEllipsisVertical className="fs-4" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}