"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignments } from "../../../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = assignments.find((a) => a._id === aid);

    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">
                    Assignment Name
                </label>
                <input
                    id="wd-name"
                    className="form-control"
                    defaultValue={assignment.title}
                />
            </div>

            <div className="mb-3">
                <textarea
                    id="wd-description"
                    className="form-control"
                    rows={10}
                    defaultValue={assignment.description}
                />
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">
                    Points
                </label>
                <div className="col-sm-9">
                    <input
                        id="wd-points"
                        type="number"
                        className="form-control"
                        defaultValue={assignment.points}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">
                    Assignment Group
                </label>
                <div className="col-sm-9">
                    <select id="wd-group" className="form-select">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">
                    Display Grade as
                </label>
                <div className="col-sm-9">
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="Percentage">Percentage</option>
                        <option value="Points">Points</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">
                    Submission Type
                </label>
                <div className="col-sm-9">
                    <div className="border p-3">
                        <select id="wd-submission-type" className="form-select mb-3">
                            <option value="Online">Online</option>
                        </select>

                        <div className="mb-2">
                            <strong>Online Entry Options</strong>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-text-entry"
                            />
                            <label className="form-check-label" htmlFor="wd-text-entry">
                                Text Entry
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-website-url"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="wd-website-url">
                                Website URL
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-media-recordings"
                            />
                            <label className="form-check-label" htmlFor="wd-media-recordings">
                                Media Recordings
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-student-annotation"
                            />
                            <label className="form-check-label" htmlFor="wd-student-annotation">
                                Student Annotation
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="wd-file-upload"
                            />
                            <label className="form-check-label" htmlFor="wd-file-upload">
                                File Uploads
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-3 col-form-label text-end">Assign</label>
                <div className="col-sm-9">
                    <div className="border p-3">
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="form-label fw-bold">
                                Assign to
                            </label>
                            <input
                                id="wd-assign-to"
                                className="form-control"
                                defaultValue="Everyone"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="form-label fw-bold">
                                Due
                            </label>
                            <input
                                type="datetime-local"
                                id="wd-due-date"
                                className="form-control"
                                defaultValue={formatDate(assignment.dueDate)}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="wd-available-from" className="form-label fw-bold">
                                    Available from
                                </label>
                                <input
                                    type="datetime-local"
                                    id="wd-available-from"
                                    className="form-control"
                                    defaultValue={formatDate(assignment.availableFrom)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="wd-available-until" className="form-label fw-bold">
                                    Until
                                </label>
                                <input
                                    type="datetime-local"
                                    id="wd-available-until"
                                    className="form-control"
                                    defaultValue={formatDate(assignment.availableUntil)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="d-flex justify-content-end">
                <Link
                    href={`/Courses/${cid}/Assignments`}
                    className="btn btn-secondary me-2"
                >
                    Cancel
                </Link>
                <Link
                    href={`/Courses/${cid}/Assignments`}
                    className="btn btn-danger"
                >
                    Save
                </Link>
            </div>
        </div>
    );
}