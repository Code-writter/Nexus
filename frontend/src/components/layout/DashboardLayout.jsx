import { useContext } from "react";
import Navbar from "../Navbar";
import SideMenu from "../SideMenu";
import { UserContext } from "../../context/UserContext";
import UserCard from "../UserCard";


export default function DashboardLayout({children, activeMenu}){

    const {user} = useContext(UserContext)
    console.log(user)
    return(
        <div>
            <Navbar />

            { user && (<div className=" flex " >
                <div className=" max-[1080px]:hidden " >
                    <SideMenu activeMenu={activeMenu} />
                </div>
                
                <div className=" grow mx-5" >
                    {children}
                </div>

                <div className=" hidden md:block mr-5" >
                    <UserCard 
                        name={user && user.name}
                        totalPollsVotes={user&& user.totalPollsVotes}
                        totalPollsCreated={user&& user.totalPollsCreated}
                        totlaPollsBookmarked={user&&user.totlaPollsBookmarked}
                    />
                </div>
            </div>)
        
            }
        </div>
    )
}