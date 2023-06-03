import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    type: null,
    message: null
};

export const toggleNotification = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.type = action.payload[0];
            state.message = action.payload[1];
        },
        close: (state) => {
            state.type = null;
            state.message = null;   
        }
    }
});

export const { setNotification, close } = toggleNotification.actions;
export default toggleNotification.reducer;