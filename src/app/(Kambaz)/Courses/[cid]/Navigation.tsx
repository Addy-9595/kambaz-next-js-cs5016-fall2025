"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link
            key={link}
            href={path}
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