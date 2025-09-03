import { createContext, useState } from "react";
import React from "react";

// @ts-ignore
export const AppContent = createContext();



interface Props {
    children : React.ReactNode
}

export const AppContextProvider = ({children} : Props  ) => {



    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData
    }

    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}