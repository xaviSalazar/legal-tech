import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    ticketsList: [],
    isLoading: false,
    error:'',
}

const ticketsListSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        fetchTicketsLoading: (state) => {
            state.isLoading = true
        },
        fetchTicketsSuccess: (state, action) => {
            // console.log(state)
            state.ticketsList = action.payload
            state.isLoading = false
        },
        fetchTicketsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        modifyTicketStatus: (state, action) => {
            const {ticketId, status} = action.payload
            const newTickets = JSON.parse(JSON.stringify(current(state)))
            const variable = newTickets.ticketsList.map(item => { 
                                                                if(item['ticketsTransactions']) 
                                                                {
                                                                    const uno = item['ticketsTransactions'].map(obj => { 
                                                                        console.log(`inside item tickets transa`)
                                                                                                            if(obj.ticketId === ticketId) {
                                                                                                                console.log(`inside return: ${status}`)
                                                                                                                return {...obj, status: status};
                                                                                                            } else {
                                                                                                                return obj;}
                                                                                                            })
                                                                    return {...item, ticketsTransactions: uno }
                                                                } else {
                                                                    return item
                                                                }})  
            state.ticketsList = variable
        }
    
}})

const { reducer, actions } = ticketsListSlice;

export const {fetchTicketsFail, fetchTicketsSuccess, fetchTicketsLoading, modifyTicketStatus} = actions

export default reducer;