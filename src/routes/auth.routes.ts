import { Router  } from "express";
import {singIn, singUp} from '../controllers/user.controler'

// Initialization router
const router = Router();

// routes
router.post('/singup', singUp)
router.post('/singin',singIn)

export default router;