import { configureStore } from "@reduxjs/toolkit";
import setNavBarBgColorReducer from "../features/setNavBarBgColor";
import setRoleReducer from "../features/identifyRole";
import userDataSliceReducer from "../features/getUserData";
import toggleNotificationReducer from "../features/toggleNotification";

export const store = configureStore({
    reducer: {
        navBarBgColor: setNavBarBgColorReducer,
        setRole: setRoleReducer,
        userDataSlice: userDataSliceReducer,
        toggleNotification: toggleNotificationReducer
    },
});

export default store;
