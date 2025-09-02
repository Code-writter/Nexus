import { Router } from "express";
import {
    handleUsers,
    handleRegisterUser
} from '../controllers/user.controller.js'

const router = Router()

router.route('/')
    .get(handleUsers)
    .post(handleRegisterUser)
    


export default router