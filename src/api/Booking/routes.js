import express from 'express';
const router = express.Router();
import {
    create_booking_middleware
} from "./middleware.js"
import {
    create_booking,view_user_bookings, view_all_user_bookings
} from "./controller.js"
import { authcheck } from '../auth/middleware.js';

router.post("/create", authcheck, create_booking_middleware, create_booking)

router.get("/view",authcheck,view_user_bookings)

router.get("/view/all",authcheck,view_all_user_bookings)

export default router