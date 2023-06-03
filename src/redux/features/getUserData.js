import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    userData: [],
};

export const getUserData = createAsyncThunk(
  'users/getUserData',
  async (userId, thunkAPI) => {
    const { data } = await axios.get("/getUserData");
    return data
  }
)

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // Add user to the state array
      state.userData = [];
      state.userData.push(action.payload)
    })
  },
});

export default userDataSlice.reducer;