import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    abogadosList: [],
    isLoading: false,
    error:'',
}

const abogadosListSlice = createSlice({
    name: 'abogadoList',
    initialState,
    reducers: {
        fetchAbogadoLoading: (state) => {
            state.isLoading = true
        },
        fetchAbogadoSuccess: (state, action) => {
            state.abogadosList = action.payload
            state.isLoading = false
        },
        fetchAbogadoFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

const { reducer, actions } = abogadosListSlice;

export const {fetchAbogadoFail, fetchAbogadoSuccess, fetchAbogadoLoading} = actions

export default reducer;