"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [currentPath, setCurrentPath] = useState("");
  const [mounted, setMounted] = useState(false);
  const links = ["SignIn", "Signup", "Profile"];

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  if (!mounted) return null;

  return (
    <div id="wd-account-navigation" className="list-group">
      {links.map((link) => {
        const isActive = currentPath.includes(link);
        
        return (
          <Link
            key={link}
            href={`/Account/${link}`}
            className={`list-group-item border border-0 ${
              isActive
                ? "active text-black border-start border-start-4 border-danger"
                : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
      {currentUser?.role === "ADMIN" && (
        <Link
          href="/Account/Users"
          className={`list-group-item border border-0 ${
            currentPath.includes("Users")
              ? "active text-black border-start border-start-4 border-danger"
              : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}