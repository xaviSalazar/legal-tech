import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: {},
    isLoading: false,
    error: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserPending: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, action) => {
            state.isLoading = false;
            state.account = action.payload;
            state.error = ''
        },
        getUserFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

const {reducer, actions} = userSlice

export const {getUserPending,getUserSuccess,getUserFail} = actions
export default reducer