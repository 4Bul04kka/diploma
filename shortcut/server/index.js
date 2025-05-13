import express from "express";
import cors from "cors";
import pool from "./db.js";
import fileUpload from "express-fileupload";
// import router from "./router.js"; // Removed old router
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

// Import new routers and middleware
import authRouter from "./authRouter.js";
import profileRouter from "./profileRouter.js";
import applicationRouter from "./applicationRouter.js";
import dataRouter from "./dataRouter.js";
import authMiddleware from "./authMiddleware.js"; // Import the auth middleware

const PORT = 3001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем YAML через абсолютный путь
const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml"));

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));

// Use auth router (login endpoint - no auth required)
app.use("/api", authRouter);

// Apply authentication middleware to all subsequent /api routes
// This protects routes in profileRouter, listingRouter, applicationRouter, dataRouter
app.use("/api", authMiddleware);

// Use other routers (protected routes)
app.use("/api/profiles", profileRouter);
app.use("/api", applicationRouter); // applicationRouter includes /import/application
app.use("/api", dataRouter); // dataRouter includes /financial-data

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Корневой маршрут
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
  console.log(`Swagger UI доступен на http://localhost:${PORT}/api-docs`);
});
