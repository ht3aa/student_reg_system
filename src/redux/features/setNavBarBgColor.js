import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: "transparent",
};

export const setNavBarBgColor = createSlice({
    name: "color",
    initialState,
    reducers: {
        changeNavBarBgColor: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { changeNavBarBgColor } = setNavBarBgColor.actions;
export default setNavBarBgColor.reducer;