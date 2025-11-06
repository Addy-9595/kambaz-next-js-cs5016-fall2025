"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState({
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
});
  const router = useRouter();

  const signup = () => {
    // In a real app, this would call an API
    console.log("Signup:", user);
    router.push("/Account/Signin");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
      />
      <FormControl
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        className="mb-2"
        placeholder="first name"
      />
      <FormControl
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        className="mb-2"
        placeholder="last name"
      />
      <FormControl
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="mb-2"
        placeholder="email"
        type="email"
      />
      <Button onClick={signup} className="w-100 mb-2">
        Sign up
      </Button>
      <Link href="/Account/Signin">Sign in</Link>
    </div>
  );
}