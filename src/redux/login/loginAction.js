import {loginPending, loginSuccess, loginFail, logoutErase} from './loginSlice'
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

export const autoLogin = () => async(dispatch) => {
    try {
        dispatch(loginPending())
        // call the api 
        const token = localStorage.getItem('customerToken')
        const config = {
              headers: {Authorization: `Bearer ${token}`}
        } 
        console.log(token)
          const response = await httpManager.customerAuth(config)
          console.log(response)
          if(response['data']['responseCode'] === 200) {
            dispatch(loginSuccess(response['data']['responseData']['userMod']))
          } else {
            dispatch(loginFail(response['data']['message']))
          }
    } catch(error) {
        dispatch(loginFail(error.message))
    }
}

export const doLogout = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('customerToken');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        localStorage.removeItem('customerToken')
        const response = await httpManager.logoutUser(config)
        if(response['data']['responseCode'] === 200) {
            dispatch(logoutErase())
        }

    } catch(error) {
        dispatch(loginFail(error.message))
    }
}