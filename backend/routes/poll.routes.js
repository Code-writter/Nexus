import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import{
    handleCreatePoll,
    handleGetAllPolls,
    handlegetVotedPolls,
    handleGetPollById,
    handleVoteOnPoll,
    handleClosePolls,
    handleBookmarkedPolls,
    handleDeletePolls
} from "../controllers/poll.controller.js"


const router = Router()

router.route("/create")
.post( verifyJWT ,handleCreatePoll) //done

router.route("/getAllPolls")
.get(verifyJWT, handleGetAllPolls); //done

router.route("/votedPolls")
.get(verifyJWT, handlegetVotedPolls); //done

router.route("/:id")
.get(verifyJWT, handleGetPollById);

router.route("/:id/vote")
.post(verifyJWT, handleVoteOnPoll); // done

router.route("/:id/close")
.post(verifyJWT, handleClosePolls);

router.route("/user/bookmarked")
.get(verifyJWT, handleBookmarkedPolls);

router.route("/:id/delete")
.delete(verifyJWT, handleDeletePolls);



export default router