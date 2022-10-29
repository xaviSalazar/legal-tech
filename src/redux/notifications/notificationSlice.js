import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    notifsList: [],
    isLoading: false,
    error:'',
}

const notifsListSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        fetchNotificationsLoading: (state) => {
            state.isLoading = true
        },
        fetchNotificationsSuccess: (state, action) => {
            state.notifsList = action.payload
            state.isLoading = false
        },
        fetchNotificationsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        modifyNotificationStatus: (state, action) => {
            const {id} = action.payload
            console.log(id)
            const currentNotifications = JSON.parse(JSON.stringify(current(state)))
            console.log(currentNotifications)

            const variable =  currentNotifications.notifsList.map((notification) => { if(notification._id === id) {
                                                                            return {...notification, isUnread:false}
                                                                        }return notification})
            console.log(variable)
            // const variable = newTickets.notifsList.map(item => { 
            //                                                     if(item['ticketsTransactions']) 
            //                                                     {
            //                                                         const uno = item['ticketsTransactions'].map(obj => { 
            //                                                             console.log(`inside item tickets transa`)
            //                                                                                                 if(obj.ticketId === ticketId) {
            //                                                                                                     console.log(`inside return: ${status}`)
            //                                                                                                     return {...obj, status: status};
            //                                                                                                 } else {
            //                                                                                                     return obj;}
            //                                                                                                 })
            //                                                         return {...item, ticketsTransactions: uno }
            //                                                     } else {
            //                                                         return item
            //                                                     }})  
            console.log(variable)
            state.notifsList = variable
        }
    
}})

const { reducer, actions } = notifsListSlice;

export const {fetchNotificationsFail, fetchNotificationsSuccess, fetchNotificationsLoading, modifyNotificationStatus} = actions

export default reducer;