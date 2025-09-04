import { LuBadgeCheck, LuBookMarked, LuLayoutDashboard, LuLogOut, LuPenTool, LuVote} from "react-icons/lu"
 
export const SIDEBAR_MENU_DATA=[
    {
        id : 1,
        label : "Dashboard", 
        icon : LuLayoutDashboard ,
        path : "dashboard"
    },
    {
        id : 2,
        label : "Create Poll", 
        icon : LuVote,
        path : "create-poll"
    },
    {
        id : 3,
        label : "My Polls", 
        icon : LuPenTool,
        path : "my-polls"
    },
    {
        id : 4,
        label : "Voted Polls", 
        icon : LuBadgeCheck ,
        path : "voted-polls"
    },
    {
        id : 5,
        label : "Bookmarks", 
        icon : LuBookMarked,
        path : "bookmarked"
    },
    {
        id : 6,
        label : "Logout", 
        icon : LuLogOut,
        path : "logout"
    },
]