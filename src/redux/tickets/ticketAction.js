import {fetchTicketsFail, fetchTicketsSuccess, fetchTicketsLoading} from './ticketSlice'
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