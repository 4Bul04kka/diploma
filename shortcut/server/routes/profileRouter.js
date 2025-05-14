import express from "express";
import ProfileController from "../controllers/ProfileController.js";
import authMiddleware from '../middleware/authMiddleware.js'; // Import authMiddleware

const router = express.Router();

// Use controller methods for routes
// Profile creation routes do not require authentication (for registration)
router.post("/client", ProfileController.createClientProfile);
router.post("/bank", ProfileController.createBankProfile);

// Apply authMiddleware to routes that require authentication (getting and deleting profiles)
router.get("/client/:id", authMiddleware, ProfileController.getClientProfile);
router.delete("/client/:id", authMiddleware, ProfileController.deleteClientProfile);
router.get("/bank/:id", authMiddleware, ProfileController.getBankProfile);
router.delete("/bank/:id", authMiddleware, ProfileController.deleteBankProfile);

export default router;
