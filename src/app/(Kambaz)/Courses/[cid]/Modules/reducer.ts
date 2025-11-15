import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      state.modules = [...state.modules, action.payload];
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module: any) =>
        module._id === action.payload._id ? action.payload : module
      );
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module: any) => module._id !== action.payload
      );
    },
    editModule: (state, action) => {
      state.modules = state.modules.map((module: any) =>
        module._id === action.payload
          ? { ...module, editing: true }
          : { ...module, editing: false }
      );
    },
  },
});

export const { 
  setModules, 
  addModule, 
  updateModule, 
  deleteModule, 
  editModule 
} = modulesSlice.actions;

export default modulesSlice.reducer;