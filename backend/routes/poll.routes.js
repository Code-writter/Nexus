import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import{
    handleCreatePoll
} from "../controllers/poll.controller.js"


const router = Router()

router.route("/create").post( verifyJWT ,handleCreatePoll)


export default router