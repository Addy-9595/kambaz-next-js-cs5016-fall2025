"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";

export default function KambazNavigation() {
  const pathname = usePathname();
  
  const links = [
    { label: "Account", path: "/Account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LuSettings },
  ];

  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="NEU" />
      </a>
      
      {links.map((link) => {
        const isActive = pathname.includes(link.path);
        return (
          <Link
            key={link.path}
            href={link.path}
            className={`list-group-item text-center border-0 bg-black ${
              isActive ? "bg-white text-danger" : "text-white"
            }`}
          >
            <link.icon className={`fs-1 ${isActive ? "text-danger" : "text-white"}`} />
            <br />
            <span
              className={`small ${isActive ? "text-danger" : "text-white"}`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}