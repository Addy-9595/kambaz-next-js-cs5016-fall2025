"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountNavigation() {
  const [currentPath, setCurrentPath] = useState("");
  const links = ["SignIn", "Signup", "Profile"];

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

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
    </div>
  );
}