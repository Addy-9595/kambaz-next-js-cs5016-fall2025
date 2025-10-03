import { FormControl, FormLabel, Button } from "react-bootstrap";
import Link from "next/link";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            
            <FormLabel htmlFor="wd-username">Username</FormLabel>
            <FormControl 
                id="wd-username"
                defaultValue="alice"
                className="mb-2"
            />
            <br />
            
            <FormLabel htmlFor="wd-password">Password</FormLabel>
            <FormControl 
                id="wd-password"
                defaultValue="123" 
                type="password"
                className="mb-2"
            />
            <br />
            
            <FormLabel htmlFor="wd-firstname">First Name</FormLabel>
            <FormControl 
                id="wd-firstname"
                defaultValue="Alice"
                className="mb-2"
            />
            <br />
            
            <FormLabel htmlFor="wd-lastname">Last Name</FormLabel>
            <FormControl 
                id="wd-lastname"
                defaultValue="Wonderland"
                className="mb-2"
            />
            <br />
            
            <FormLabel htmlFor="wd-dob">Date of Birth</FormLabel>
            <FormControl 
                id="wd-dob"
                type="date"
                defaultValue="2000-01-01"
                className="mb-2"
            />
            <br />
            
            <FormLabel htmlFor="wd-email">Email</FormLabel>
            <FormControl 
                id="wd-email"
                type="email"
                defaultValue="alice@wonderland.com"
                className="mb-2"
            />
            <br />
            
            <FormLabel htmlFor="wd-role">Role</FormLabel>
            <FormControl 
                id="wd-role"
                defaultValue="User"
                className="mb-2"
            />
            <br />
            
            <Link href="/Dashboard" className="btn btn-danger w-100">
                Signout
            </Link>
        </div>
    );
}