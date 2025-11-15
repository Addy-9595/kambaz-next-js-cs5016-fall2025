"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";

// Format date for datetime-local input (YYYY-MM-DDTHH:mm)
const formatDateForInput = (dateString: string | undefined | null) => {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return "";
  }
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // ✅ Get assignments from Redux store as fallback
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const isNewAssignment = aid === "new";
  
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid as string,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch assignment if editing existing one
  useEffect(() => {
    const fetchAssignment = async () => {
      if (!isNewAssignment && aid) {
        try {
          setLoading(true);
          
          // ✅ Try to fetch from backend first
          const data = await client.findAssignmentById(aid as string);
          setAssignment({
            ...data,
            dueDate: formatDateForInput(data.dueDate),
            availableFrom: formatDateForInput(data.availableFrom),
            availableUntil: formatDateForInput(data.availableUntil),
          });
        } catch (error: any) {
          console.error("❌ Error fetching from backend:", error);
          
          // ✅ Fallback: Check Redux store
          const localAssignment = assignments.find((a: any) => a._id === aid);
          
          if (localAssignment) {
            console.log("✅ Found assignment in Redux store");
            setAssignment({
              ...localAssignment,
              dueDate: formatDateForInput(localAssignment.dueDate),
              availableFrom: formatDateForInput(localAssignment.availableFrom),
              availableUntil: formatDateForInput(localAssignment.availableUntil),
            });
          } else {
            console.error("❌ Assignment not found in Redux either");
            setError("Failed to load assignment - not found");
          }
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchAssignment();
  }, [aid, isNewAssignment, assignments]);

  // Handle form submission
  const handleSave = async () => {
    // Validation
    if (!assignment.title.trim()) {
      setError("Assignment title is required");
      return;
    }
    
    if (!assignment.dueDate) {
      setError("Due date is required");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      const assignmentData = {
        title: assignment.title,
        description: assignment.description,
        points: Number(assignment.points) || 100,
        course: assignment.course,
        dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString() : new Date().toISOString(),
        availableFrom: assignment.availableFrom ? new Date(assignment.availableFrom).toISOString() : new Date().toISOString(),
        availableUntil: assignment.availableUntil ? new Date(assignment.availableUntil).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      
      console.log("💾 Saving assignment data:", assignmentData);
      
      if (isNewAssignment) {
        // Create new assignment
        const newAssignment = await client.createAssignment(cid as string, assignmentData);
        console.log("✅ New assignment created:", newAssignment);
        dispatch(addAssignment(newAssignment));
      } else {
        // Update existing assignment
        const updatedAssignment = await client.updateAssignment({
          ...assignmentData,
          _id: aid,
        });
        console.log("✅ Assignment updated:", updatedAssignment);
        dispatch(updateAssignment(updatedAssignment));
      }
      
      // Navigate back to assignments list
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error: any) {
      console.error("❌ Error saving assignment:", error);
      console.error("📛 Error details:", error.response?.data);
      setError(error.response?.data?.message || "Failed to save assignment. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  if (loading && !isNewAssignment) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>{isNewAssignment ? "New Assignment" : "Edit Assignment"}</h3>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-assignment-name">Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="wd-assignment-name"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            placeholder="Enter assignment name"
            disabled={loading}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-assignment-description">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            id="wd-assignment-description"
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter assignment description"
            disabled={loading}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-assignment-points">Points</Form.Label>
          <Form.Control
            type="number"
            id="wd-assignment-points"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })
            }
            min="0"
            disabled={loading}
          />
        </Form.Group>

        {/* Due Date */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-assignment-due">Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-assignment-due"
            value={assignment.dueDate}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
            disabled={loading}
          />
        </Form.Group>

        {/* Available From */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-assignment-available-from">
            Available From
          </Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-assignment-available-from"
            value={assignment.availableFrom}
            onChange={(e) =>
              setAssignment({ ...assignment, availableFrom: e.target.value })
            }
            disabled={loading}
          />
        </Form.Group>

        {/* Available Until */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-assignment-available-until">
            Available Until
          </Form.Label>
          <Form.Control
            type="datetime-local"
            id="wd-assignment-available-until"
            value={assignment.availableUntil}
            onChange={(e) =>
              setAssignment({ ...assignment, availableUntil: e.target.value })
            }
            disabled={loading}
          />
        </Form.Group>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSave}
            disabled={loading}
            id="wd-assignment-save-btn"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}