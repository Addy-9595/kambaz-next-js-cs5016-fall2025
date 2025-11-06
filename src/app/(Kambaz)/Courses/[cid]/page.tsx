import { redirect } from "next/navigation";
// Redirect to Home page of the course
export default async function CoursesPage({ 
  params, 
}: { 
  params: Promise<{ cid: string }>; 
}) {
  const { cid } = await params;
  redirect(`/Courses/${cid}/Home`);
}