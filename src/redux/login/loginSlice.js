import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: false,
    userType: '',
    error: ''
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending:(state) => {
            state.isLoading = true

        },
        loginSuccess:(state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.userType = action.payload
            state.error = ''
        },
        loginFail:(state, action) => {
            state.isLoading = false
            state.error = action.payload

        },
    }
});

const { reducer, actions } = loginSlice

export const{loginPending, loginSuccess, loginFail} = actions

export default reducer