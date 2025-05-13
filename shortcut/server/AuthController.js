import jwt from 'jsonwebtoken';
import pool from './db.js'; // Import the database connection pool

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable in production

class AuthController {
  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      console.log(`Attempting login for: ${email} with role: ${role}`);

      if (!email || !password || !role) {
         return res.status(400).json({ message: "Email, password, and role are required." });
      }

      if (role !== 'client') {
          return res.status(400).json({ message: "Only client login is supported for now." });
      }

      // 1. Fetch the client from your database based on email and role.
      const client = await pool.query(
          'SELECT * FROM clients WHERE email = $1 AND password = $2', // WARNING: Plain password. Use hashing in production!
          [email, password]
      );

      // 2. Check if client exists and password matches (password check is done in query for now)
      if (client.rows.length === 0) {
           return res.status(401).json({ code: "auth_001", message: "Invalid credentials" });
      }

      const user = client.rows[0]; // Get the client user object

      // 3. If credentials are valid, generate a JWT.
      const token = jwt.sign(
        { userId: user.id, role: role, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      res.status(200).json({ token });

    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ code: "server_001", message: "Internal server error" });
    }
  }

  // You might add registration, logout, etc. methods here later
}

export default new AuthController();
