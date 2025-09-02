import { Router } from "express";
import {
    handleUserInformation
} from '../controllers/user.controller.js'

const router = Router()

router.route('/')
    .get(handleUserInformation)


export default router