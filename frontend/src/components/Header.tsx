import { useContext, useEffect, useState } from "react";
import { AppContent } from "../context/AppContex";
import { pollApi } from "../api/axios";

export default function Header() {
    // @ts-ignore
    const {userData} = useContext(AppContent)
    const [polls, setPolls] = useState()
    useEffect(() => { 
        const getPolls = async () => {
            try {
                const {data} = await pollApi.get("/getAllPolls?page=1&limit=2")

                if(data.success){
                    setPolls(data.data)
                }
            } catch (error) {
                
            }
        }

        getPolls()
    }, [])

    console.log(userData)
    return (
        <header className="flex items-center ">
            <h1>Header</h1>
            <h1 className="text-xl font-bold " > 
                Welcome to our app {userData?.data?.fullName}
            </h1>


            <div className=" flex items-center justify-baseline bg-amber-400" >
                {
                    polls && (
                        <div>
                            {JSON.stringify(polls)}
                        </div>
                    )
                }
            </div>
        </header>
    );
}