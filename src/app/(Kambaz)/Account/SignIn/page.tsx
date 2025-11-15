// app/(Kambaz)/Account/SignIn/page.tsx
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import Link from "next/link";
import * as client from "../client";
import { Button, FormControl } from "react-bootstrap";

export default function SignIn() {
  // ✅ FIX: Initialize with empty strings instead of undefined
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ FIX: Make the function async directly
  const handleSignin = async () => {
    if (!credentials.username || !credentials.password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      console.log("🔐 Attempting signin with:", credentials.username);
      
      const user = await client.signin(credentials);
      
      console.log("✅ User signed in:", user);
      dispatch(setCurrentUser(user));
      
      // Navigate to dashboard
      router.push("/Dashboard");
      
    } catch (err: any) {
      console.error("❌ Signin error:", err);
      setError(err.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignin();
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3>Sign in</h3>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username}  // ✅ Now always a string
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />
      
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}  // ✅ Now always a string
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />
      
      <Button 
        onClick={handleSignin}
        variant="primary"
        className="w-100 mb-2"
        id="wd-signin-btn"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      
      <Link href="/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}