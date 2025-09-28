import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
    status: false,
    userData: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuth,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload
        },
        logout: (state, action) => {
            state.status = false;
            state.userData = null
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;