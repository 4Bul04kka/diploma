import express from "express";
import ProfileController from "../controllers/ProfileController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Use controller methods for routes
router.post("/client", authMiddleware, ProfileController.createClientProfile);
router.post("/bank", authMiddleware, ProfileController.createBankProfile);
router.get("/client/:id", ProfileController.getClientProfile);
router.delete("/client/:id", ProfileController.deleteClientProfile);
router.get("/bank/:id", ProfileController.getBankProfile);
router.delete("/bank/:id", ProfileController.deleteBankProfile);

export default router;
