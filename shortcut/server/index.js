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
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import dataRouter from "./routes/dataRouter.js";
import authMiddleware from "./middleware/authMiddleware.js"; // Import the auth middleware

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

// REMOVED: Global application of authMiddleware
// app.use("/api", authMiddleware);

// Use other routers. Apply authMiddleware to specific routes/routers as needed.
// Profile creation routes are public.
app.use("/api/profiles", profileRouter); // authMiddleware will be applied within profileRouter for protected routes
app.use("/api", applicationRouter); // authMiddleware will need to be applied within applicationRouter for protected routes
app.use("/api", dataRouter); // authMiddleware will need to be applied within dataRouter for protected routes

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
