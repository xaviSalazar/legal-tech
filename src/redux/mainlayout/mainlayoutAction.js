import {fetchAbogadoFail, fetchAbogadoSuccess, fetchAbogadoLoading} from './mainlayoutSlice'
import { httpManager } from '../../managers/httpManager';

export const fetchAllAbogados = () => async (dispatch) => {
    // first dispatch the loading
    dispatch(fetchAbogadoLoading())
    
    try {
        // fetch data from api 
        const result = await httpManager.retrieveUsers()

        console.log(result)
        
        dispatch(fetchAbogadoSuccess(result.data.responseData))


    } catch (error) {
        dispatch(fetchAbogadoFail(error.message));
    }

}