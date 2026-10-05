import apiService from "../api/apiService";

// register auth component when click register button

export const registerAPI = async (userData)=>{
    return await  apiService("POST","/register",userData)
}

// login auth component when click login button

export const loginAPI = async (userData)=>{
    return await  apiService("POST","/login",userData)
}