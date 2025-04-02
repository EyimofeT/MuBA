import express from 'express';
const router = express.Router();
import {
    create_profile_middleware, update_profile_middleware
} from "./middleware.js"
import {
    create_profile, view_profile, update_profile
} from "./controller.js"
import { authcheck } from '../auth/middleware.js';

import multer from "multer";
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage: storage });

router.post("/create/profile",authcheck,upload.fields([{ name: 'image', maxCount: 1 }]), create_profile_middleware, create_profile)

router.get("/view/profile",authcheck, view_profile)

router.patch("/update/profile",authcheck,upload.fields([{ name: 'image', maxCount: 1 }]), update_profile_middleware, update_profile)
export default router