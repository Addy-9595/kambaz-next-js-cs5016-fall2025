// app/(Kambaz)/Account/reducer.ts
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

const initialState = {
  currentUser: loadUserFromStorage(),
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
        } else {
          localStorage.removeItem('currentUser');
        }
      }
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;