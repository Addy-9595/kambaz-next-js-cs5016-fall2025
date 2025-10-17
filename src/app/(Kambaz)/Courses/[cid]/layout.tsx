import Breadcrumb from "./Breadcrumb";
import { courses } from "../../Database"; 
import CourseNavigation from "./Navigation";

export default async function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ cid: string }>;
}) {
    const { cid } = await params;
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