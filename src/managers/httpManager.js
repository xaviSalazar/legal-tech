import { accordionSummaryClasses } from "@mui/material";
import axios from "axios"

//const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://legaltech-example.herokuapp.com"

// do functions to register users
const facebookLogin = async (data) => {
    return await axios.post(`${API_BASE_URL}/facebook-login`, data)
}

const googleLogin = async (data) =>{
    return await axios.post(`${API_BASE_URL}/google-login`, data)
}

const registerCustomer = async (data) => {
    return await axios.post(`${API_BASE_URL}/register`, data)
}

const ownRegisterCustomer = async (data) => {
    return await axios.post(`${API_BASE_URL}/own-register`, data)
}

const loginUser = async (data) => {
    return await axios.post(`${API_BASE_URL}/login`, data)
}

const customerAuth = async (data) => {
    return await axios.get(`${API_BASE_URL}/authUser`, data)
}
// const createUser = async (userData) => {
//    return await axios.post(`${API_BASE_URL}/user`, userData)
// }

// const searchUser = async (phoneNumber) => {
//     return await axios.get(`${API_BASE_URL}/search-user?phone=${phoneNumber}`)
// };

// const createChannel = async (requestData) => {
//     return await axios.post(`${API_BASE_URL}/channel`, requestData)
// };

// const getChannelList = async (userId) => {
//     return await axios.get(`${API_BASE_URL}/channel-list?userId=${userId}`)
// };

// const sendMessage = async (requestData) => {
//     return await axios.post(`${API_BASE_URL}/message`, requestData)
// };

// const getAllUsers = async (client) => {
//     return await axios.get(`${API_BASE_URL}/get-users?owner=${client}`)
// };

// const deleteALlMsg = async(contact, userApp) => {
//     return await axios.get(`${API_BASE_URL}/delete-messages?contact=${contact}&&userApp=${userApp}`)
// }

// const checkMsgToRead = async(user_id) => {
//     return await axios.get(`${API_BASE_URL}/change-to-read?user_id=${user_id}`)
// }

// const sendBusinessMessage = async(requestData) => {
//     return await axios.post(`${API_BASE_URL}/init-conversation`, requestData)
// }

// const getWhatsappTemplates = async(client) => {

//     return await axios.get(`${API_BASE_URL}/retrieve-user-whatsapp-templates?owner=${client}`)
// }

// const getPresignedUrl = async (fileName) => {
//     return await axios.get(`${API_BASE_URL}/get-signed-url?fileName=${fileName}`)
// }

// const uploadFileFromBrowser = async (url, file) => {
//     return await axios.post(url, file)
// }

export const httpManager = {

    facebookLogin,
    registerCustomer,
    ownRegisterCustomer,
    loginUser,
    googleLogin,
    customerAuth
    
  
};