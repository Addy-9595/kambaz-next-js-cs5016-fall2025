"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("Current User:", currentUser);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();
// Render navigation menu
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.includes(link);
        return (
          <Link
            key={link}
            href={`/Account/${link}`}
            className={`list-group-item border border-0 ${
              isActive
                ? "active text-black border-start border-start-4 border-primary"
                : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}