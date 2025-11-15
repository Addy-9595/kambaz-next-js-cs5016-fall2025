// app/(Kambaz)/Account/Signup/page.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import * as client from "../client";
import { Button, FormControl } from "react-bootstrap";

export default function Signup() {
  // ✅ Initialize all fields with empty strings
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT"
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async () => {
    if (!user.username || !user.password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      console.log("📝 Attempting signup with:", user.username);
      
      const newUser = await client.signup(user);
      
      console.log("✅ User created:", newUser);
      dispatch(setCurrentUser(newUser));
      
      // Navigate to profile
      router.push("/Account/Profile");
      
    } catch (err: any) {
      console.error("❌ Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4">
      <h3>Sign up</h3>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        className="mb-2"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        className="mb-2"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-email"
        placeholder="Email"
        type="email"
        className="mb-2"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        disabled={loading}
      />
      
      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        value={user.dob}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
        disabled={loading}
      />
      
      <select
        id="wd-role"
        className="form-select mb-2"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        disabled={loading}
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>
      
      <Button 
        onClick={handleSignup}
        variant="primary"
        className="w-100 mb-2"
        id="wd-signup-btn"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </Button>
      
      <Link href="/Account/SignIn" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}