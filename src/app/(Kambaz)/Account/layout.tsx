import { ReactNode } from "react";
import Link from "next/link";

export default function AccountLayout({ 
  children 
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <div id="wd-account-navigation">
                <Link href="/Account/Signin"> Signin </Link> <br />
                <Link href="/Account/Signup"> Signup </Link> <br />
                <Link href="/Account/Profile"> Profile </Link> <br />
              </div>
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}