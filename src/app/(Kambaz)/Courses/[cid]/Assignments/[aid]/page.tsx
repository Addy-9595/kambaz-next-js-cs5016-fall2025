import Link from "next/link";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="p-3">
            <form>
                {/* Assignment Name */}
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="wd-name"
                        defaultValue="A1"
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <textarea 
                        className="form-control"
                        id="wd-description"
                        rows={8}
                        defaultValue="The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page."
                    />
                </div>

                {/* Points */}
                <div className="row mb-3">
                    <label htmlFor="wd-points" className="col-sm-2 col-form-label">
                        Points
                    </label>
                    <div className="col-sm-10">
                        <input 
                            type="number"
                            className="form-control"
                            id="wd-points"
                            defaultValue={100}
                        />
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="row mb-3">
                    <label htmlFor="wd-group" className="col-sm-2 col-form-label">
                        Assignment Group
                    </label>
                    <div className="col-sm-10">
                        <select className="form-select" id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </div>
                </div>

                {/* Display Grade as */}
                <div className="row mb-3">
                    <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">
                        Display Grade as
                    </label>
                    <div className="col-sm-10">
                        <select className="form-select" id="wd-display-grade-as">
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                            <option value="Complete/Incomplete">Complete/Incomplete</option>
                        </select>
                    </div>
                </div>

                {/* Submission Type */}
                <div className="row mb-3">
                    <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label">
                        Submission Type
                    </label>
                    <div className="col-sm-10">
                        <div className="border p-3">
                            <select className="form-select mb-3" id="wd-submission-type">
                                <option value="Online">Online</option>
                                <option value="Paper">Paper</option>
                                <option value="External Tool">External Tool</option>
                            </select>

                            <div>
                                <strong>Online Entry Options</strong>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        id="wd-text-entry"
                                    />
                                    <label className="form-check-label" htmlFor="wd-text-entry">
                                        Text Entry
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        id="wd-website-url"
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="wd-website-url">
                                        Website URL
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        id="wd-media-recordings"
                                    />
                                    <label className="form-check-label" htmlFor="wd-media-recordings">
                                        Media Recordings
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        id="wd-student-annotation"
                                    />
                                    <label className="form-check-label" htmlFor="wd-student-annotation">
                                        Student Annotation
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        id="wd-file-upload"
                                    />
                                    <label className="form-check-label" htmlFor="wd-file-upload">
                                        File Uploads
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assign */}
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">
                        Assign
                    </label>
                    <div className="col-sm-10">
                        <div className="border p-3">
                            <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                            <input 
                                type="text"
                                className="form-control mb-3"
                                id="wd-assign-to"
                                defaultValue="Everyone"
                            />

                            <label htmlFor="wd-due-date" className="form-label">Due</label>
                            <input 
                                type="datetime-local"
                                className="form-control mb-3"
                                id="wd-due-date"
                                defaultValue="2024-05-13T23:59"
                            />

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="wd-available-from" className="form-label">Available from</label>
                                    <input 
                                        type="datetime-local"
                                        className="form-control"
                                        id="wd-available-from"
                                        defaultValue="2024-05-06T00:00"
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="wd-available-until" className="form-label">Until</label>
                                    <input 
                                        type="datetime-local"
                                        className="form-control"
                                        id="wd-available-until"
                                        defaultValue="2024-05-20T23:59"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <hr />
                <div className="d-flex justify-content-end">
                    <Link href="/Courses/1234/Assignments">
                        <button type="button" className="btn btn-secondary me-2">
                            Cancel
                        </button>
                    </Link>
                    <button type="submit" className="btn btn-danger">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}