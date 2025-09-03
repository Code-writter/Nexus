import axios from "axios";

export const userApi = axios.create({
    baseURL : "http://localhost:3000/api/v1/user",
    withCredentials : true
})

export const pollApi = axios.create({
    baseURL : "http://localhost:3000/api/v1/poll",
    withCredentials : true
})