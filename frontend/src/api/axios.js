import axios from 'axios'

import { BASE_URL } from './urls'

const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials : true,
    headers : {
        "Content-Type" : "application/json",
        "Accept"  : "application/json"
    }
})


axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.message){
            if(error.response.status === 401){
                console.error("Unauthorized Redirecting to login...")
                window.location.href = "/login"
            }else if(error.response.status === 500){
                console.error("Server Error ")
            }
        }else if(error.code === 'ECONNABORTED'){
            console.error("Request time out")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
