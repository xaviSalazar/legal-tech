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

const logoutUser = async(data) => {
    return await axios.get(`${API_BASE_URL}/logout`, data)
}

const getPresignedUrl = async (fileName) => {
    return await axios.get(`${API_BASE_URL}/get-signed-url?fileName=${fileName}`)
}

const uploadFileFromBrowser = async (url, file) => {
    return await axios.post(url, file)
}

const updateProfilePicture = async(data) => {
    return await axios.post(`${API_BASE_URL}/change-profile-picture`, data)
}

const updateAbogadoProfile = async(data) => {
    return await axios.post(`${API_BASE_URL}/update-abogado-profile`, data)
}

const retrieveUsers = async() => {
    return await axios.get(`${API_BASE_URL}/retrieve-abogados`)
}

const createTicket = async(data) => {
    return await axios.post(`${API_BASE_URL}/create-ticket`, data)
}

export const httpManager = {
    facebookLogin,
    registerCustomer,
    ownRegisterCustomer,
    loginUser,
    googleLogin,
    customerAuth,
    logoutUser,
    getPresignedUrl,
    uploadFileFromBrowser,
    updateProfilePicture,
    updateAbogadoProfile,
    retrieveUsers,
    createTicket
};