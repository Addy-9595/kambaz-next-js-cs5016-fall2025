"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const href = link === "People" 
                    ? `/Courses/${cid}/People/Table` 
                    : `/Courses/${cid}/${link}`;
                
                const isActive = mounted && (
                    pathname === href || 
                    (link === "People" && pathname?.startsWith(`/Courses/${cid}/People`))
                );
                
                return (
                    <Link
                        key={link}
                        href={href}
                        id={`wd-course-${link.toLowerCase()}-link`}
                        className={`list-group-item ${
                            isActive ? "active" : "text-danger"
                        } border-0`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}