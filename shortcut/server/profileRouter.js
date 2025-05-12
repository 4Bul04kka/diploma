import express from "express";
import ProfileController from "./ProfileController.js";

const router = express.Router();

// Use controller methods for routes
router.post("/client", ProfileController.createClientProfile);
router.post("/bank", ProfileController.createBankProfile);
router.get("/client/:id", ProfileController.getClientProfile);
router.delete("/client/:id", ProfileController.deleteClientProfile);
router.get("/bank/:id", ProfileController.getBankProfile);
router.delete("/bank/:id", ProfileController.deleteBankProfile);

export default router;
