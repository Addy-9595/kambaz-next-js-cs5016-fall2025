"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as client from "../../client";
import { useParams } from "next/dist/client/components/navigation";

export default function PeopleTable({ users: initialUsers = [], fetchUsers }:
{ users?: any[]; fetchUsers: () => void; }) {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>(initialUsers);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Fetching users for course:", cid);
                const enrolledUsers = await client.findUsersForCourse(cid as string);
                console.log("Received users:", enrolledUsers);
                setUsers(enrolledUsers);
                setError(null);
            } catch (error: any) {
                console.error("Error fetching users:", error);
                console.error("Error response:", error.response?.data);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, [cid]);
    
    if (loading) {
        return <div className="p-4">Loading users...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4">
                Error loading users: {error}
            </div>
        );
    }
    
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
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center">
                                No students enrolled in this course.
                            </td>
                        </tr>
                    ) : (
                        users.map((user: any) => (
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