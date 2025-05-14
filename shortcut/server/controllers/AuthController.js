import jwt from 'jsonwebtoken';
import pool from '../db.js'; // Import the database connection pool from the new location
import bcrypt from 'bcrypt'; // Import bcrypt

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
          // Extend this later if you add bank manager login
          return res.status(400).json({ message: "Only client login is supported for now." });
      }

      // 1. Fetch the client from your database based on email.
      const client = await pool.query(
          'SELECT * FROM clients WHERE email = $1',
          [email]
      );

      // 2. Check if client exists
      if (client.rows.length === 0) {
           return res.status(401).json({ code: "auth_001", message: "Invalid credentials" });
      }

      const user = client.rows[0]; // Get the client user object

      // 3. Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ code: "auth_001", message: "Invalid credentials" });
      }

      // 4. If credentials are valid, generate a JWT.
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
