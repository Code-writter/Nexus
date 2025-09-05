
// export const BASE_URL = "http://localhost:3000/api/v1"
export const BASE_URL = "https://nexus-backend-kappa.vercel.app/api/v1"


export const API_PATHS = {
    AUTH :{
        LOGIN : "/user/login",
        REGISTER : "/user/register",
        GET_USER_INFO : "/user/information",
    },
    POLLS : {
        CREATE : "/poll/create",
        GET_ALL : "/poll/getAllPolls",
        // GET_BY_ID : `/poll/${pollId}`,
        // VOTE : `/poll/${pollId}/vote`,
        // CLOSE : `/poll/${pollId}/close`,
        // BOOKMARK : `/poll/${pollId}/bookmarks`,
        // GET_BOOKMARKED : `/poll/user/bookmarked`,
        // VOTED_POLLS : `poll/votedPolls`,
        // DELETE : `/poll/${pollId}/delete`
    }
};


