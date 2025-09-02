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
    const {type, creatorId, page = 1, limit = 10} = req.query;

    const userId = req.user._id;

    const filter = {};

    if(type) filter.type = type;
    if(creatorId) filter.creatorId = creatorId;

    // Calculate Pagination
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skip = (pageNumber - 1 ) * pageSize

    // Get the polls
    const polls = await Poll.find(filter)
    .populate("creator", "fullName email")
    .populate({
        path : "responses.voterId",
        select : "fullName"
    })
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt : -1 })

    if(!polls)
        throw new ApiError(500, "No polls found")

    // Add user voted polls
    const updatedPolls = polls.map((poll) => {
        const hasVoted = poll.voters.some((voterId) => voterId.equals(userId));

        return {
            ...poll.toObject(),
            hasVoted
        }
    })

    // Get total count of polls for the pagination
    const totalPolls = await Poll.countDocuments(filter)

    const stats = await Poll.aggregate([
        {
            $group : {
                _id : "$typeOfPoll",
                count : { $sum : 1 }
            },
        },
        {
            $project : {
                type : "$_id",
                count : 1,
                _id : 0
            }
        }
    ])
    console.log(stats)
    // Note make sure all types are included in the page
    const allTypesOfPolls = [
        {
            type : "single-choice",
            label : "Single Choice"
        },
        {
            type : "open-ended",
            label : "Open Ended"
        },
        {
            type : "rating",
            label : "Rating"
        },
        {
            type : "opinion",
            label : "Opinion"
        },
    ]

    const statsWithDefault = allTypesOfPolls.map((pollType) => {
        const stat = stats.find((item) => item.type === pollType.type ) 
        console.log(stat)
        return {
            label : pollType.label,
            type : pollType.type,
            count : stat ? stat.count : 0
        }
    }).sort((a, b) => b.count - a.count)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                polls : updatedPolls,
                currentPage : pageNumber,
                totalPages : Math.ceil(totalPolls / pageSize),
                totalPolls,
                stats : statsWithDefault
            }
        )
    )
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