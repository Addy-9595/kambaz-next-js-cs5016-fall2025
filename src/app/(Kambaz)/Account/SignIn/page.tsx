import Link from "next/link";
export default function SignIn() {
return(
    <div id="wd-signin">
        <h1>Sign In</h1>
        <input type="text" placeholder="Username" id="wd-username-input"/>
        <br/>
        <input type="password" placeholder="Password" id="wd-password-input"/>
        <br/>
        <Link href = "Sign In">Sign In</Link>
        <Link href="Sign Up">Sign Up</Link>
        <Link href= "Profile">Profile</Link>
    </div>
)

}