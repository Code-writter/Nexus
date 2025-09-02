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


export {
    handleCreatePoll
}