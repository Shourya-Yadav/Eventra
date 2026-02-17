import express from "express";
import {
    createProduct,
    getVendorProducts,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// Vendor Only Routes
router.post("/", authMiddleware, allowRoles("vendor"), createProduct);

router.get("/my-products", authMiddleware, allowRoles("vendor"), getVendorProducts);

router.put("/:id", authMiddleware, allowRoles("vendor"), updateProduct);

router.delete("/:id", authMiddleware, allowRoles("vendor"), deleteProduct);

export default router;
