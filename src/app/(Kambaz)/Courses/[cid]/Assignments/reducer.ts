// app/(Kambaz)/Courses/[cid]/Assignments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // Set all assignments (used when fetching from server)
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    
    // Add a new assignment
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload];
    },
    
    // Update an existing assignment
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment: any) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
    },
    
    // Delete an assignment
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== action.payload
      );
    },
  },
});

export const { 
  setAssignments, 
  addAssignment, 
  updateAssignment, 
  deleteAssignment 
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;