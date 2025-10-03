import { FormControl } from "react-bootstrap";
import Link from "next/link";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1>Sign up</h1>
            <FormControl 
                id="wd-username"
                placeholder="username"
                className="mb-2"
            />
            <br />
            <FormControl 
                id="wd-password"
                placeholder="password" 
                type="password"
                className="mb-2"
            />
            <br />
            <Link 
                id="wd-signup-btn"
                href="/Dashboard"
                className="btn btn-primary w-100 mb-2"
            >
                Sign up
            </Link>
            <br />
            <Link id="wd-signin-link" href="/Account/Signin">
                Sign in
            </Link>
        </div>
    );
}