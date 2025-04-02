import express from 'express';
const router = express.Router();
import {
    create_event_middleware, update_event_middleware
} from "./middleware.js"
import {
    create_event, view_all_event,view_artist_personal_event, update_event
} from "./controller.js"
import { authcheck } from '../auth/middleware.js';


router.post("/create",authcheck, create_event_middleware, create_event)

router.get("/view/all",authcheck, view_all_event)
router.get("/view/artist-personal",authcheck, view_artist_personal_event)

router.patch("/update",authcheck, update_event_middleware, update_event)
export default router