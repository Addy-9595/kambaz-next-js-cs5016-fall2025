// In your Signin page or component
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import Link from "next/link";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignin = () => {
    const user = db.users.find(
      (u: any) => 
        u.username === credentials.username && 
        u.password === credentials.password
    );
    
    if (user) {
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3>Sign in</h3>
      <input 
        id="wd-username"
        placeholder="username" 
        className="form-control mb-2"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input 
        id="wd-password"
        placeholder="password" 
        type="password" 
        className="form-control mb-2"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button 
        onClick={handleSignin}
        className="btn btn-primary w-100 mb-2"
        id="wd-signin-btn"
      >
        Sign in
      </button>
      <Link href="/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}