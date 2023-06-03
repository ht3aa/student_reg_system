import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAdmin: false,
    isSuperviser: false,
    isManager: false,
};

export const identifyRole = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRoleAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setRoleSuperviser: (state, action) => {
            state.isSuperviser = action.payload;
        },
        setRoleManager: (state, action) => {
            state.isManager = action.payload;
        }
    }
});

export const { setRoleAdmin, setRoleSuperviser, setRoleManager } = identifyRole.actions;
export default identifyRole.reducer;