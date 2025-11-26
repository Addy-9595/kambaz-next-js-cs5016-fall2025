"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from "../client";
import PeopleDetails from "./PeopleDetails";

export default function Users() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState({ firstName: "", lastName: "" });
  const [mounted, setMounted] = useState(false);

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    setUsers(users.filter((u) => u._id !== userId));
  };

  const handleEditClick = (user: any) => {
    setEditingUserId(user._id);
    setEditName({ firstName: user.firstName, lastName: user.lastName });
  };

  const handleSaveEdit = async (userId: string) => {
    const user = users.find((u) => u._id === userId);
    const updatedUser = { ...user, ...editName };
    await client.updateUser(updatedUser);
    setUsers(users.map((u) => (u._id === userId ? updatedUser : u)));
    setEditingUserId(null);
  };

  const handleAddUser = async () => {
    const newUser = {
      username: "newuser",
      password: "password123",
      firstName: "New",
      lastName: "User",
      email: "newuser@example.com",
      dob: "2000-01-01",
      role: "STUDENT",
    };
    const created = await client.createUser(newUser);
    setUsers([...users, created]);
  };

  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, []);

  if (!mounted) return null;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <div className="alert alert-danger">Access Denied</div>;
  }
// Display user management interface
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h3>Users</h3>
          <div className="mb-3">
            <select
              value={role}
              onChange={(e) => filterUsersByRole(e.target.value)}
              className="form-select float-start w-25 me-2"
            >
              <option value="">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrators</option>
            </select>
            <input
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={(e) => filterUsersByName(e.target.value)}
              className="form-control float-start w-25"
            />
          </div>
          <button onClick={handleAddUser} className="btn btn-primary mb-3">
            + People
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Login ID</th>
                <th>Section</th>
                <th>Role</th>
                <th>Last Activity</th>
                <th>Total Activity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    {editingUserId === user._id ? (
                      <>
                        <input
                          value={editName.firstName}
                          onChange={(e) =>
                            setEditName({ ...editName, firstName: e.target.value })
                          }
                          className="form-control form-control-sm d-inline w-auto me-1"
                        />
                        <input
                          value={editName.lastName}
                          onChange={(e) =>
                            setEditName({ ...editName, lastName: e.target.value })
                          }
                          className="form-control form-control-sm d-inline w-auto"
                        />
                      </>
                    ) : (
                      <span
                        onClick={() => setSelectedUser(user)}
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        {user.firstName} {user.lastName}
                      </span>
                    )}
                  </td>
                  <td>{user.loginId || user._id}</td>
                  <td>{user.section || "S101"}</td>
                  <td>{user.role}</td>
                  <td>{user.lastActivity || "N/A"}</td>
                  <td>{user.totalActivity || "N/A"}</td>
                  <td>
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => handleSaveEdit(user._id)}
                        className="btn btn-success btn-sm me-1"
                      >
                        ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user)}
                        className="btn btn-warning btn-sm me-1"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          {selectedUser && <PeopleDetails user={selectedUser} />}
        </div>
      </div>
    </div>
  );
}