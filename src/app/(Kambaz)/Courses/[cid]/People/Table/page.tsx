"use client";
import { Table } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
    const { cid } = useParams();
    const { users, enrollments } = db;
    
    // Debug: Log the values to see what's happening
    console.log("Course ID (cid):", cid);
    console.log("All enrollments:", enrollments);
    console.log("All users:", users);
    
    // Filter enrolled users
    const enrolledUsers = users.filter((usr) =>
        enrollments.some((enrollment) =>
            enrollment.user === usr._id && enrollment.course === cid
        )
    );
    
    console.log("Filtered enrolled users:", enrolledUsers);
    
    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledUsers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center">
                                No students enrolled in this course. (Course ID: {cid})
                            </td>
                        </tr>
                    ) : (
                        enrolledUsers.map((user: any) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>
                                    <span className="wd-last-name"> {user.lastName}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
}