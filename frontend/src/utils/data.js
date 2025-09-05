import { LuBadgeCheck, LuBookMarked, LuLayoutDashboard, LuLogOut, LuPenTool, LuVote} from "react-icons/lu"
 
export const SIDEBAR_MENU_DATA=[
    {
        id : 1,
        label : "Dashboard", 
        icon : LuLayoutDashboard ,
        path : "/dashboard"
    },
    {
        id : 2,
        label : "Create Poll", 
        icon : LuVote,
        path : "/create-poll"
    },
    {
        id : 3,
        label : "My Polls", 
        icon : LuPenTool,
        path : "/my-polls"
    },
    {
        id : 4,
        label : "Voted Polls", 
        icon : LuBadgeCheck ,
        path : "/voted-polls"
    },
    {
        id : 5,
        label : "Bookmarked", 
        icon : LuBookMarked,
        path : "/bookmarked-polls"
    },
    {
        id : 6,
        label : "Logout", 
        icon : LuLogOut,
        path : "logout"
    },
]


export const POLL_TYPES = [
    {
        id : "01",
        label : "Yes/No",
        value : "opinion"
    },
    {
        id : "02",
        label : "Single Choice",
        value : "single-choice"
    },
    {
        id : "03",
        label : "Rating",
        value : "rating"
    },
    {
        id : "04",
        label : "Open Ended",
        value : "open-ended"
    },
]