import express from "express";
import {
    addMembership,
    updateMembership,
    getMemberships
} from "../controllers/membershipController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// ADMIN ONLY
router.post("/", authMiddleware, allowRoles("admin"), addMembership);

router.put("/:id", authMiddleware, allowRoles("admin"), updateMembership);

router.get("/", authMiddleware, allowRoles("admin"), getMemberships);


export default router;
