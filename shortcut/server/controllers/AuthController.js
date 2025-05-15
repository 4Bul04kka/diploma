import jwt from "jsonwebtoken";
import pool from "../db.js";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

class AuthController {
  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      console.log(`Attempting login for: ${email} with role: ${role}`);

      if (!email || !password || !role) {
        return res
          .status(400)
          .json({ message: "Email, password, and role are required." });
      }

      // Поддерживаем только 'client' и 'bank'
      if (role !== "client" && role !== "bank") {
        return res
          .status(400)
          .json({
            message: "Unsupported role. Allowed roles: 'client', 'bank'.",
          });
      }

      // Выбираем нужную таблицу и поля в зависимости от роли
      const table = role === "client" ? "clients" : "banks";
      const userResult = await pool.query(
        `SELECT id, email, password FROM ${table} WHERE email = $1`,
        [email]
      );

      if (userResult.rows.length === 0) {
        return res
          .status(401)
          .json({ code: "auth_001", message: "Invalid credentials" });
      }

      const user = userResult.rows[0];

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ code: "auth_001", message: "Invalid credentials" });
      }

      // Генерация JWT
      const token = jwt.sign(
        { userId: user.id, role, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token, userId: user.id, role });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ code: "server_001", message: "Internal server error" });
    }
  }
}

export default new AuthController();
