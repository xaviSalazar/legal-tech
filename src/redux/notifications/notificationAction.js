import {fetchNotificationsFail, fetchNotificationsSuccess, fetchNotificationsLoading, modifyNotificationStatus} from './notificationSlice'
import { httpManager } from '../../managers/httpManager'

export const fetchAllNotifs = (id) => async (dispatch) => {
    // dispatch loading state
    dispatch(fetchNotificationsLoading())
    try {
        // fetch data 
        const result = await httpManager.fetchUnreadNotifications(id)
        dispatch(fetchNotificationsSuccess(result.data.responseData))
    } catch (error) {
        dispatch(fetchNotificationsFail(error.message))
    }
}

export const markAsRead = (id) => async(dispatch) => {
    try {
        const result = await httpManager.markAsReadSingleNotification(id)
        if(result['data']['responseCode'] === 200) {

            dispatch(modifyNotificationStatus(id))
        }

    } catch (error) {
        dispatch(fetchNotificationsFail(error.message))
    }
}