import express from "express";
import AuthController from "./AuthController.js"; // Import the controller

const router = express.Router();

// Use the controller method for the login route
router.post("/login", AuthController.login);

// Placeholder route was removed
// router.post("/login", (req, res) => {
//   res.status(200).json({ message: "Login route placeholder" });
// });

export default router;
