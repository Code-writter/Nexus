import { 
    Routes, 
    Route,
    Navigate
} from "react-router-dom"
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import CreatedPolls from "./pages/Dashboard/CreatePolls";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import BookmarkedPolls from "./pages/Dashboard/Bookmarked";
import UserProvider from "./context/UserContext";
import {Toaster} from "react-hot-toast"



export default function App(){
    return (
        <UserProvider>
            <Routes>
                <Route path={"/"} element={<Root />}  />
                <Route path={"/login"} element={<Login />}  />
                
                <Route path={"/sign-up"} element={<SignUp />}  />
                <Route path={"/dashboard"} element={<Home />}  />
                <Route path={"/create-poll"} element={<CreatedPolls />}  />
                <Route path={"/my-polls"} element={<MyPolls />}  />
                <Route path={"/voted-polls"} element={<VotedPolls />}  />
                <Route path={"/bookmarked-polls"} element={<BookmarkedPolls />}  />
            </Routes>

            <Toaster  
                toastOptions={{
                    className : "",
                    style : {
                        font : "13px"
                    }
                }}
            />

        </UserProvider>
    )
}   



// Root 

const Root = () => {
    // check of the Token in the cookies 
    const isAutheticated = !!localStorage.getItem("accessToken");

    return isAutheticated ? (
        <Navigate to={"/dashboard"} />
    ) : (
        <Navigate to={"/sign-up"} />
    )
}