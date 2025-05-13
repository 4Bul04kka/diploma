import express from "express";
import AuthController from "../controllers/AuthController.js"; // Import the controller from the new location

const router = express.Router();

// Use the controller method for the login route
router.post("/login", AuthController.login);

// Placeholder route was removed
// router.post("/login", (req, res) => {
//   res.status(200).json({ message: "Login route placeholder" });
// });

export default router;
