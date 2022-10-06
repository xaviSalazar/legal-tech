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

export const httpManager = {
    facebookLogin,
    registerCustomer,
    ownRegisterCustomer,
    loginUser,
    googleLogin,
    customerAuth,
    logoutUser
};