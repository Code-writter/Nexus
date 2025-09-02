import { Router } from "express";
import {
    handleRegisterUser,
    handleLoginUser
} from '../controllers/user.controller.js'

const router = Router()

router.route('/register').post(handleRegisterUser)
router.route('/login').post(handleLoginUser)
    


export default router