import {ReactNode} from 'react';

export default function AccountLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return <div>
        <h1>Account Section</h1>
        <table>
            <tbody>
                <tr>
                    <td valign="top" width="100px">
                        <a href="/Kambaz/Account/SignIn" id="wd-signin-link">Sign In</a>
                        <br/>
                        <a href="/Kambaz/Account/SignUp" id="wd-signup-link">Sign Up</a>
                        <br/>
                        <a href="/Kambaz/Account/Profile" id="wd-profile-link">Profile</a>
                    </td>
                    <td valign="top">{children}</td>
                </tr>
            </tbody>
        </table>
    </div>;
}