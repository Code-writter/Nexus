import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { getPollBookmarked } from "../../utils/helper"
import UserProfileInfo from "./UserProfileInfo"

export default function PollCard({

    pollId,
    question,
    type,
    questions,
    options,
    voters,
    responses,
    creator,
    userHasVoted,
    isPolLClosed,
    createdAt
}){

    const {user} = useContext(UserContext)
    const [selectOptionIndex, setSelectedOptionIndex] = useState(-1)
    const [rating, setRating] = useState(0)
    const [userResponse, setUserResponse] = useState(0)

    const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted)

    const [pollResult, setPollResult] = useState({
        options,
        voters,
        responses
    })

    // const isPollBookmarked = getPollBookmarked(
    //     pollId, user.bookmarkedPolls || []
    // )

    // const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked)
    const [pollClosed, setPollClosed] = useState(isPolLClosed || false)
    const [pollDelete, setPollDeleted] = useState(false)

    // console.log("Creator in Poll Card", creator)

    return(
        
            !pollDelete && (
                <div className=" bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto" >
                    <div className=" flex items-start justify-between" >
                        <UserProfileInfo
                            fullName={creator}
                            createdAt={createdAt}
                           
                        />
                    </div>
                </div>
            )
        
    )
}