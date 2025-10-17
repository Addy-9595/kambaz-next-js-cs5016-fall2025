"use client";
import { useParams } from "next/navigation";
import { modules } from "../../../Database"; // Use absolute import
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
    const {cid} = useParams();
    
    // Debug: Check what we're getting
    console.log("Current course ID:", cid);
    console.log("All modules:", modules);
    
    const courseModules = modules.filter((module: any) => module.course === cid);
    console.log("Filtered modules for this course:", courseModules);
    
    return (
        <div>
            <ModulesControls />
            <br /><br /><br /><br />
            
            {courseModules.length === 0 ? (
                <div className="alert alert-warning">
                    No modules found for this course. Course ID: {cid}
                </div>
            ) : (
                <ListGroup id="wd-modules" className="rounded-0">
                    {courseModules.map((module: any) => (
                        <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {module.name} 
                                <ModuleControlButtons />
                            </div>
                            
                            {module.lessons && (
                                <ListGroup className="wd-lessons rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name} 
                                            <LessonControlButtons />
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}