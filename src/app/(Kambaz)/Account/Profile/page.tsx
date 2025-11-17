// app/(Kambaz)/Account/Profile/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { Button, FormControl } from "react-bootstrap";

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  
  // ✅ Prevent hydration mismatch by waiting for client mount
  const [mounted, setMounted] = useState(false);
  
  // ✅ Initialize all fields with empty strings
  const [profile, setProfile] = useState({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT"
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Set mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load current user data into form
  useEffect(() => {
    if (currentUser) {
      setProfile({
        _id: currentUser._id || "",
        username: currentUser.username || "",
        password: currentUser.password || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        // ✅ Extract just the date part (yyyy-MM-dd) from ISO format
        dob: currentUser.dob ? currentUser.dob.split('T')[0] : "",
        role: currentUser.role || "STUDENT"
      });
    }
  }, [currentUser]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      
      const updatedUser = await client.updateUser(profile);
      
      console.log("✅ Profile updated:", updatedUser);
      dispatch(setCurrentUser(updatedUser));
      setSuccess("Profile updated successfully!");
      
    } catch (err: any) {
      console.error("❌ Update error:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      router.push("/Account/SignIn");
    } catch (err) {
      console.error("Signout error:", err);
    }
  };

  // ✅ Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (!currentUser) {
    return (
      <div className="p-4">
        <div className="alert alert-warning">
          Please sign in to view your profile.
        </div>
        <Button onClick={() => router.push("/Account/SignIn")}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div id="wd-profile-screen" className="p-4">
      <h3>Profile</h3>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        className="mb-2"
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        className="mb-2"
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-email"
        placeholder="Email"
        type="email"
        className="mb-2"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        value={profile.dob}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        disabled={loading}
      />
      
      <select
        id="wd-role"
        className="form-select mb-3"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        disabled={loading}
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>
      
      <Button 
        onClick={handleUpdate}
        variant="primary"
        className="w-100 mb-2"
        id="wd-update-btn"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </Button>
      
      <Button 
        onClick={handleSignout}
        variant="danger"
        className="w-100"
        id="wd-signout-btn"
      >
        Sign out
      </Button>
    </div>
  );
}