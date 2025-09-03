import { 
    BrowserRouter as Router,
    Routes, 
    Route,
    Navigate
} from "react-router-dom"
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import CreatedPolls from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import BookmarkedPolls from "./pages/Dashboard/Bookmarked";

export default function App(){
    return (
        <div>
            <Router>
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
            </Router>
        </div>
    )
}   



// Root 

const Root = () => {
    // check of the Token in the cookies 
    const isAutheticated = !!cookieStore.get("accessToken");

    return isAutheticated ? (
        <Navigate to={"/dashboard"} />
    ) : (
        <Navigate to={"/sign-up"} />
    )
}