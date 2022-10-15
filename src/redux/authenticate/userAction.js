import { getUserPending,getUserSuccess,getUserFail } from "./userSlice";
import { httpManager } from "../../managers/httpManager";

export const getUserProfile = () => async(dispatch) => {
    try {
        dispatch(getUserPending())
        // call the api 
        const token = localStorage.getItem('customerToken')
        const config = {
              headers: {Authorization: `Bearer ${token}`}
        } 
          const response = await httpManager.customerAuth(config)
          if(response['data']['responseCode'] === 200) {
            dispatch(getUserSuccess(response['data']['responseData']))
          } else {
            dispatch(getUserFail(response['data']['responseData']))
          }
    

    } catch(error) {
        dispatch(getUserFail(error.message))
    }
}