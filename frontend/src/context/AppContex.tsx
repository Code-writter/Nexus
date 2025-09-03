import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { userApi } from "../api/axios";


export const AppContent = createContext({
    backendUrl : "",
    isLoggedIn : false,
    setIsLoggedIn : () => {},
    userData : null,
    setUserData : () => {},
    getUserData : () => {}
});



interface Props {
    children : React.ReactNode
}

export const AppContextProvider = ({children} : Props  ) => {



    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)

    const getAuthState = async() => {
        try {
            // axios.defaults.withCredentials = true;
            const {data} = await userApi.get("/isAuthenticated")
            console.log(data)
            if(data.success){
                setIsLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAuthState()
    },[])

    const getUserData = async () => {
        try {
            // axios.defaults.withCredentials = true;
            const{data} = await userApi.get("/getCurrentUser")
            console.log(data)
            if(data.success){
                setUserData(data)
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}