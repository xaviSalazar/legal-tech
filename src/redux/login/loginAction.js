import {loginPending, loginSuccess, loginFail} from './loginSlice'
import { httpManager } from '../../managers/httpManager'



export const doLogin = (data) => async (dispatch) => {

    // first dispatch the loading
    dispatch(loginPending())
    
    try {
        // fetch data from api 
        const result = await httpManager.loginUser(data)
        if(result['data']['responseCode'] === 200) {
        // succesfully registered go to login page
        const token = result['data']['responseData']['token']
        localStorage.setItem('customerToken', token)
        dispatch(loginSuccess(result['data']['responseData']['ClienteExist']['userMod']))
        } else if(result['data']['responseCode'] === 400){
            dispatch(loginFail(result['data']['message']))
        }
    } catch (error) {
        dispatch(loginFail(error.message));
    }

}