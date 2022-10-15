import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticketsList: [],
    isLoading: false,
    error:'',
}

const ticketsListSlice = createSlice({
    name: 'ticketsList',
    initialState,
    reducers: {
        fetchTicketsLoading: (state) => {
            state.isLoading = true
        },
        fetchTicketsSuccess: (state, action) => {
            state.ticketsList = action.payload
            state.isLoading = false
        },
        fetchTicketsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

const { reducer, actions } = ticketsListSlice;

export const {fetchTicketsFail, fetchTicketsSuccess, fetchTicketsLoading} = actions

export default reducer;