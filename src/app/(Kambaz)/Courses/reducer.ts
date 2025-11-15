// app/(Kambaz)/Courses/reducer.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [] as any[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Set all courses (used when fetching from server)
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    
    // Add a new course
    addCourse: (state, action) => {
      state.courses = [...state.courses, action.payload];
    },
    
    // Update an existing course
    updateCourse: (state, action) => {
      state.courses = state.courses.map((course: any) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
    
    // Delete a course
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== action.payload
      );
    },
  },
});

export const { 
  setCourses, 
  addCourse, 
  updateCourse, 
  deleteCourse 
} = coursesSlice.actions;

export default coursesSlice.reducer;