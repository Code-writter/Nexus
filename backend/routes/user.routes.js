import { Router } from "express";
import {
    handleUserInformation,
    handleRegisterUser,
    handleLoginUser
} from '../controllers/user.controller.js'

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(handleRegisterUser)
router.route('/login').post(handleLoginUser)
router.route("/information").get(verifyJWT, handleUserInformation)


export default router