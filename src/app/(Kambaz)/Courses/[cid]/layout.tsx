import Breadcrumb from "./Breadcrumb";
import { courses } from "../../Database"; 
import CourseNavigation from "./Navigation";

export default function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { cid: string };
}) {
    const { cid } = params;
    const course = courses.find((course) => course._id === cid);
    
    return (
        <div id="wd-courses">
            <h2>
                <Breadcrumb course={course} />
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}