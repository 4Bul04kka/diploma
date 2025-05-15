import pool from "../db.js"; // Import the database connection pool from the new location
import bcrypt from "bcrypt"; // Import bcrypt

const SALT_ROUNDS = 10; // Define the number of salt rounds for bcrypt

class ProfileController {
  async createClientProfile(req, res) {
    try {
      const {
        email,
        full_name,
        company_name,
        inn,
        kpp,
        address,
        financial_info,
        password,
      } = req.body;

      // Basic validation
      if (
        !email ||
        !full_name ||
        !company_name ||
        !inn ||
        !address ||
        !financial_info ||
        !password
      ) {
        // KPP is optional based on init.sql
        return res
          .status(400)
          .json({
            message:
              "Email, full name, company name, inn, address, financial info, and password are required.",
          });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Removed user_id as it's not in the clients table based on init.sql
      const result = await pool.query(
        "INSERT INTO clients (email, full_name, company_name, inn, kpp, address, financial_info, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
        [
          email,
          full_name,
          company_name,
          inn,
          kpp,
          address,
          financial_info,
          hashedPassword,
        ]
      );

      const newProfileId = result.rows[0].id;

      res
        .status(201)
        .json({
          message: "Client profile created successfully",
          profileId: newProfileId,
        });
    } catch (error) {
      console.error("Error creating client profile:", error);
      // Check for duplicate email error (PostgreSQL error code 23505 for unique violation)
      if (error.code === "23505") {
        return res.status(409).json({ message: "Email already exists." });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createBankProfile(req, res) {
    try {
      const { email, full_name, bank_branch, password } = req.body;

      // Basic validation
      if (!email || !full_name || !bank_branch || !password) {
        return res
          .status(400)
          .json({
            message:
              "Email, full name, bank branch, and password are required.",
          });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Removed user_id as it's not in the banks table based on init.sql
      const result = await pool.query(
        "INSERT INTO banks (email, full_name, bank_branch, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [email, full_name, bank_branch, hashedPassword]
      );

      const newProfileId = result.rows[0].id;

      res
        .status(201)
        .json({
          message: "Bank profile created successfully",
          profileId: newProfileId,
        });
    } catch (error) {
      console.error("Error creating bank profile:", error);
      // Check for duplicate email error (PostgreSQL error code 23505 for unique violation)
      if (error.code === "23505") {
        return res.status(409).json({ message: "Email already exists." });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getClientProfile(req, res) {
    try {
      const { id } = req.params; // Get the client ID from the URL parameters

      // Fetch the client and their listings concurrently
      const [clientResult, listingsResult] = await Promise.all([
        // Do not select the password field here for security
        pool.query(
          "SELECT id, email, full_name, company_name, inn, kpp, address, financial_info FROM clients WHERE id = $1",
          [id]
        ),
        pool.query(
          "SELECT id, client_id, title, description, financial_info, status, created_at FROM listings WHERE client_id = $1",
          [id]
        ),
      ]);

      const client = clientResult.rows[0];
      const listings = listingsResult.rows;

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      // Combine client data and listings
      const clientProfile = { ...client, listings };

      res.status(200).json(clientProfile); // Send back the client data with listings
    } catch (error) {
      console.error("Error fetching client profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteClientProfile(req, res) {
    // TODO: Implement client profile deletion
    res.status(501).json({ message: "Not Implemented" });
  }

  async getBankProfile(req, res) {
    try {
      const { id } = req.params; // Get the bank ID from the URL parameters

      // Fetch the bank and their applications concurrently
      const [bankResult, applicationsResult] = await Promise.all([
        // Do not select the password field here for security
        pool.query(
          "SELECT id, email, full_name, bank_branch FROM banks WHERE id = $1",
          [id]
        ),
        pool.query(
          "SELECT id, listing_id, bank_id, status, sent_at, decision_at FROM applications WHERE bank_id = $1",
          [id]
        ),
      ]);

      const bank = bankResult.rows[0];
      const applications = applicationsResult.rows;

      if (!bank) {
        return res.status(404).json({ message: "Bank not found" });
      }

      // Combine bank data and applications
      const bankProfile = { ...bank, applications };

      res.status(200).json(bankProfile); // Send back the bank data with applications
    } catch (error) {
      console.error("Error fetching bank profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteBankProfile(req, res) {
    // TODO: Implement bank profile deletion
    res.status(501).json({ message: "Not Implemented" });
  }
  async getBankProfileByToken(req, res) {
    try {
      const userId = req.user.userId;

      const [bankResult, applicationsResult] = await Promise.all([
        pool.query(
          "SELECT id, email, full_name, bank_branch FROM banks WHERE id = $1",
          [userId]
        ),
        pool.query(
          "SELECT id, listing_id, bank_id, status, sent_at, decision_at FROM applications WHERE bank_id = $1",
          [userId]
        ),
      ]);

      const bank = bankResult.rows[0];
      const applications = applicationsResult.rows;

      if (!bank) {
        return res.status(404).json({ message: "Bank not found" });
      }

      const bankProfile = { ...bank, applications };

      res.status(200).json(bankProfile);
    } catch (error) {
      console.error("Error fetching bank profile by token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProfileController();
