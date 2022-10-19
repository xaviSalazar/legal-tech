import {fetchTicketsFail, fetchTicketsSuccess, fetchTicketsLoading, modifyTicketStatus} from './ticketSlice'
import { httpManager } from '../../managers/httpManager';

export const fetchAllTickets = (id) => async (dispatch) => {
    // first dispatch the loading
    dispatch(fetchTicketsLoading())
    
    try {
        // fetch data from api 
        const result = await httpManager.fetchAllTickets(id)
        console.log(result)  
        dispatch(fetchTicketsSuccess(result.data.responseData))


    } catch (error) {
        dispatch(fetchTicketsFail(error.message));
    }

}

export const modifyTicket = (updateTicket) => async(dispatch) => {
    try {
        const result = await httpManager.modifyTicketStatus(updateTicket)
            if(result['data']['responseCode'] === 200) {
            console.log(result)
            // succesfully registered go to login page
            // const newTickets = 
            dispatch(modifyTicketStatus(updateTicket))
            } 
        } catch (error) {
            dispatch(fetchTicketsFail(error.message));
        }
    
}