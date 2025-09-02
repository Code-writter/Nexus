import { User } from '../models/user.model.js'
import { Poll } from '../models/poll.model.js'
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const handleCreatePoll = asyncHandler( async (req, res) => {
    const {question, typeOfPoll, options } = req.body;

    // Get user form the cookie
    const creator = req.user._id

    if(
        [question, typeOfPoll].some((feild) => feild?.trim() === "")
    ){
        throw new ApiError(400, "All feilds are required")
    }

    let processedOptions = [];
    switch(typeOfPoll){
        case "single-choice" : 
            if(!options || options.length < 2)
                throw new ApiError(400, "Single choice polls must have atleast two options")

            processedOptions = options.map((option) => ({optionText : option}));
            break;
        case "rating" : 
            processedOptions = [1, 2, 3, 4, 5].map((option) => ({
                optionText : option.toString()
            }))
            break;
        case "opinion" :
            processedOptions = ["Yes", "No"].map((option) => ({
                optionText : option
            }))
            break;
        case "open-ended" :// In case of open ended
            processedOptions = [] 
            break;
        default :
            throw new ApiError(400, "Invalid poll type")
    }

    const poll = await Poll.create({
        question,
        typeOfPoll,
        options : processedOptions,
        creator : creator
    })


    // Check if poll is created
    if(!poll)
        throw new ApiError(500, "Something went wrong, Poll cannot be created")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                poll : poll
            }
        )
    )
})


const handleGetAllPolls = asyncHandler( async (req, res) => {

})


const handlegetVotedPolls = asyncHandler(async (req, res) => {

})

const handleGetPollById = asyncHandler(async (req, res) => {

})

const handleVoteOnPoll = asyncHandler(async (req, res) => {

})

const handleClosePolls = asyncHandler(async (req, res) => {

})

const handleBookmarkedPolls = asyncHandler(async (req, res) => {

})

const handleDeletePolls = asyncHandler(async(req, res) => {

})

export {
    handleCreatePoll,
    handleGetAllPolls,
    handlegetVotedPolls,
    handleGetPollById,
    handleVoteOnPoll,
    handleClosePolls,
    handleBookmarkedPolls,
    handleDeletePolls
}