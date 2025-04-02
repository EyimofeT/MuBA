import express from 'express';
const router = express.Router();
import {
} from "./middleware.js"
import {
    view_user,view_all_user 
} from "./controller.js"
import { authcheck } from '../auth/middleware.js';


router.get("/view",authcheck, view_user)
router.get("/view/all",authcheck, view_all_user)
export default router