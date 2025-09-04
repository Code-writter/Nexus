import { Router } from "express";
import {
    handleUserInformation,
    handleRegisterUser,
    handleLoginUser,
    getCurrentUser,
    refreshAccessToken,
    isAuthenticated
} from '../controllers/user.controller.js'


import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(handleRegisterUser)

router.route('/login').post(handleLoginUser)

router.route("/information").get(verifyJWT, handleUserInformation)

// router.route("/getCurrentUser").get(verifyJWT, getCurrentUser)

router.route('/refresh-token').post(refreshAccessToken)

router.route('/isAuthenticated').get( verifyJWT, isAuthenticated)


export default router