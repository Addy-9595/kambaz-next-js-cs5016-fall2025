// app/(Kambaz)/Courses/[cid]/Modules/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { 
  setModules, 
  addModule, 
  updateModule, 
  deleteModule, 
  editModule 
} from "./reducer";
import { ListGroup, ListGroupItem, FormControl, Button } from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaCheckCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const [moduleName, setModuleName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const isFaculty = currentUser?.role === "FACULTY";

  // 🆕 FETCH MODULES FROM SERVER ON MOUNT
  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) return;
      
      try {
        setLoading(true);
        const serverModules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(serverModules));
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, [cid, dispatch]);

  // Filter modules for current course
  const courseModules = modules.filter(
    (module: any) => module.course === cid
  );

  // 🆕 CREATE MODULE - Call server first, then update Redux
  const handleAddModule = async () => {
    if (!moduleName.trim()) {
      alert("Please enter a module name");
      return;
    }

    try {
      const newModule = {
        name: moduleName,
        description: "",
        course: cid as string,
      };
      
      const createdModule = await client.createModule(cid as string, newModule);
      dispatch(addModule(createdModule));
      setModuleName(""); // Clear input
    } catch (error) {
      console.error("Error creating module:", error);
      alert("Failed to create module. Please try again.");
    }
  };

  // 🆕 UPDATE MODULE - Call server first, then update Redux
  const handleUpdateModule = async (module: any) => {
    try {
      await client.updateModule(module);
      dispatch(updateModule(module));
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module. Please try again.");
    }
  };

  // 🆕 DELETE MODULE - Call server first, then update Redux
  const handleDeleteModule = async (moduleId: string) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await client.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
      } catch (error) {
        console.error("Error deleting module:", error);
        alert("Failed to delete module. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-modules" className="p-4">
      {/* Module Controls - Only show for faculty */}
      {isFaculty && (
        <div className="mb-3 d-flex gap-2">
          <FormControl
            placeholder="New Module Name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddModule();
              }
            }}
            className="w-50"
            id="wd-module-name-input"
          />
          <Button 
            variant="danger" 
            onClick={handleAddModule}
            id="wd-add-module-btn"
          >
            <FaPlus /> Add Module
          </Button>
        </div>
      )}

      {/* Modules List */}
      <ListGroup id="wd-modules-list" className="rounded-0">
        {courseModules.length === 0 ? (
          <ListGroupItem className="text-center text-muted py-4">
            No modules found for this course.
          </ListGroupItem>
        ) : (
          courseModules.map((module: any) => (
            <ListGroupItem 
              key={module._id} 
              className="p-3"
              id={`wd-module-${module._id}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                {/* Module Name - Editable for faculty */}
                <div className="flex-grow-1">
                  {!module.editing ? (
                    <div className="d-flex align-items-center">
                      <FaEllipsisV className="me-2" />
                      <strong>{module.name}</strong>
                    </div>
                  ) : (
                    <FormControl
                      value={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateModule({ ...module, editing: false });
                        }
                      }}
                      className="w-50"
                      autoFocus
                      id={`wd-module-name-edit-${module._id}`}
                    />
                  )}
                </div>

                {/* Action Buttons - Only show for faculty */}
                {isFaculty && (
                  <div className="d-flex align-items-center gap-2">
                    {!module.editing ? (
                      <>
                        {/* Edit Button */}
                        <FaPencil
                          className="text-primary"
                          onClick={() => dispatch(editModule(module._id))}
                          style={{ cursor: "pointer" }}
                          id={`wd-edit-module-${module._id}`}
                        />
                        
                        {/* Delete Button */}
                        <FaTrash
                          className="text-danger"
                          onClick={() => handleDeleteModule(module._id)}
                          style={{ cursor: "pointer" }}
                          id={`wd-delete-module-${module._id}`}
                        />
                      </>
                    ) : (
                      <>
                        {/* Save Button */}
                        <FaCheckCircle
                          className="text-success"
                          onClick={() =>
                            handleUpdateModule({ ...module, editing: false })
                          }
                          style={{ cursor: "pointer" }}
                          id={`wd-save-module-${module._id}`}
                        />
                        
                        {/* Cancel Button */}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            dispatch(updateModule({ ...module, editing: false }))
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Module Description (if exists) */}
              {module.description && (
                <div className="text-muted small mt-2">
                  {module.description}
                </div>
              )}
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}