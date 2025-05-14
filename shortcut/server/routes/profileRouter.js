import express from "express";
import ProfileController from "../controllers/ProfileController.js";
// import authMiddleware from '../middleware/authMiddleware.js'; // authMiddleware is not needed for profile creation

const router = express.Router();

// Use controller methods for routes
// Removed authMiddleware from profile creation routes as they are for registration
router.post("/client", ProfileController.createClientProfile);
router.post("/bank", ProfileController.createBankProfile);

// Apply authMiddleware to routes that require authentication (e.g., getting or deleting profiles)
// router.get("/client/:id", authMiddleware, ProfileController.getClientProfile);
// router.delete("/client/:id", authMiddleware, ProfileController.deleteClientProfile);
// router.get("/bank/:id", authMiddleware, ProfileController.getBankProfile);
// router.delete("/bank/:id", authMiddleware, ProfileController.deleteBankProfile);

// Keeping these public for now based on current implementation, but they might need auth later
router.get("/client/:id", ProfileController.getClientProfile);
router.delete("/client/:id", ProfileController.deleteClientProfile);
router.get("/bank/:id", ProfileController.getBankProfile);
router.delete("/bank/:id", ProfileController.deleteBankProfile);

export default router;
