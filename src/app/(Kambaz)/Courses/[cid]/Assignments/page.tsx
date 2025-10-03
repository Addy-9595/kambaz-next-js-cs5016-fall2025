import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="input-group" style={{ width: "300px" }}>
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search for Assignment"
                        id="wd-search-assignment"
                    />
                </div>
                <div>
                    <button className="btn btn-secondary me-2" id="wd-add-group-btn">
                        <BsPlus className="fs-4" /> Group
                    </button>
                    <button className="btn btn-danger" id="wd-add-assignment-btn">
                        <BsPlus className="fs-4" /> Assignment
                    </button>
                </div>
            </div>

            <ul className="list-group rounded-0">
                {/* Assignment Group Header */}
                <li className="list-group-item p-3 bg-secondary">
                    <BsGripVertical className="me-2" />
                    ASSIGNMENTS
                    <span className="float-end">
                        40% of Total
                        <IoEllipsisVertical className="ms-2" />
                    </span>
                </li>

                {/* A1 Assignment */}
                <li className="list-group-item wd-lesson p-3">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <div className="flex-grow-1">
                            <Link 
                                href="/Courses/1234/Assignments/1"
                                className="text-decoration-none text-dark fw-bold"
                                id="wd-assignment-a1"
                            >
                                A1
                            </Link>
                            <div className="text-muted small">
                                <span className="text-danger">Multiple Modules</span> | Not available until May 6 at 12:00am |
                                <br />
                                Due May 13 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <div className="float-end">
                            <FaCheckCircle className="text-success" />
                            <IoEllipsisVertical className="fs-4 ms-2" />
                        </div>
                    </div>
                </li>

                {/* A2 Assignment */}
                <li className="list-group-item wd-lesson p-3">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <div className="flex-grow-1">
                            <Link 
                                href="/Courses/1234/Assignments/2"
                                className="text-decoration-none text-dark fw-bold"
                                id="wd-assignment-a2"
                            >
                                A2
                            </Link>
                            <div className="text-muted small">
                                <span className="text-danger">Multiple Modules</span> | Not available until May 13 at 12:00am |
                                <br />
                                Due May 20 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <div className="float-end">
                            <FaCheckCircle className="text-success" />
                            <IoEllipsisVertical className="fs-4 ms-2" />
                        </div>
                    </div>
                </li>

                {/* A3 Assignment */}
                <li className="list-group-item wd-lesson p-3">
                    <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <div className="flex-grow-1">
                            <Link 
                                href="/Courses/1234/Assignments/3"
                                className="text-decoration-none text-dark fw-bold"
                                id="wd-assignment-a3"
                            >
                                A3
                            </Link>
                            <div className="text-muted small">
                                <span className="text-danger">Multiple Modules</span> | Not available until May 20 at 12:00am |
                                <br />
                                Due May 27 at 11:59pm | 100 pts
                            </div>
                        </div>
                        <div className="float-end">
                            <FaCheckCircle className="text-success" />
                            <IoEllipsisVertical className="fs-4 ms-2" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}