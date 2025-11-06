import Link from "next/link";
//This is the catch-all account page that handles signin, signup, profile, etc.
export default async function AccountCatchAll({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params;
  const currentPage = slug?.[0] || 'signin';
  
  if (currentPage === 'signup') {
    return (
      <div id="wd-signup-screen">
        <h3>Sign up</h3>
        <input placeholder="username" className="wd-username" /><br/>
        <input placeholder="password" type="password" className="wd-password" /><br/>
        <input placeholder="verify password"
               type="password" className="wd-password-verify" /><br/>
        <Link href="/Account/Profile" > Sign up </Link><br />
        <Link href="/Account/Signin" > Sign in </Link>
      </div>
    );
  }
  
  if (currentPage === 'profile') {
    return (
      <div id="wd-profile-screen">
        <h3>Profile</h3>
        <input defaultValue="alice" placeholder="username" className="wd-username"/><br/>
        <input defaultValue="123" placeholder="password" type="password"
               className="wd-password" /><br/>
        <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" /><br/>
        <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" /><br/>
        <input defaultValue="2000-01-01" type="date" id="wd-dob" /><br/>
        <input defaultValue="alice@wonderland.com" type="email" id="wd-email" /><br/>
        <select defaultValue="FACULTY" id="wd-role">
          <option value="USER">User</option> 
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option> 
          <option value="STUDENT">Student</option>
        </select><br/>
        <Link href="/Account/Signin" > Sign out </Link>
      </div>
    );
  }
  
  // Default to signin
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input placeholder="username" className="wd-username" /> <br />
      <input placeholder="password" type="password" className="wd-password" /> <br />
      <Link href="/Dashboard" id="wd-signin-btn"> Sign in </Link> <br />
      <Link href="/Account/Signup" id="wd-signup-link"> Sign up </Link>
    </div>
  );
}