import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { getPollBookmarked } from "../../utils/helper"
import UserProfileInfo from "./UserProfileInfo"
import PollAction from "../PollAction"
import PollContent from "../PollContent"

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
    //     pollId, 
    //     user?.bookmarkedPolls || []
    // )


    // const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked)
    const [pollClosed, setPollClosed] = useState(isPolLClosed || false)
    const [pollDelete, setPollDeleted] = useState(false)

    // console.log("Creator in Poll Card", creator)

    const handleInput = (value) => {
        if(type === "rating") setRating(value)
        else if(type === "open-ended") setUserResponse(value)
        else setSelectedOptionIndex(value)
    }

    return(
        
            !pollDelete && (
                <div className=" bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto" >
                    <div className=" flex items-start justify-between" >
                        <UserProfileInfo
                            fullName={creator}
                            createdAt={createdAt}
                           
                        />

                        <PollAction
                            pollId={pollId}
                            isVoteComplete={isVoteComplete}
                            inputCapture={
                                !!(userResponse || selectOptionIndex >=0 || rating)
                            }
                            onVoteSubmit={() => {}}
                            isBookmarked={getPollBookmarked}
                            toggleBookmark={() => {}}
                            // isMyPoll={isMyPoll}
                            pollClosed={pollClosed}
                            onClosePoll={() => {}}
                            onDelete={() => {}}
                        />
                    </div>

                    <div className="ml-14 mt-3 " >
                        <p className=" text-[15px] text-black leading-8 " > {question} </p>
                        <div>
                            <PollContent 
                                type={type}
                                options={options}
                                selectOptionIndex={selectOptionIndex}
                                onOptionSelect={handleInput}
                                rating={rating}
                                onRatingChange={handleInput}
                                userResponse={userResponse}
                                onResponseChange={handleInput}
                            />
                        </div>
                    </div>
                </div>
            )
        
    )
}