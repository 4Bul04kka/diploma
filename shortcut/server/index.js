import express from "express";
import cors from "cors";
import pool from "./db.js";
import fileUpload from "express-fileupload";
import router from "./router.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

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
app.use("/api", router);

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
