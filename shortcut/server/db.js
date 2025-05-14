import pkg from "pg";
const { Pool } = pkg;

// Use DATABASE_URL environment variable for connection if available
// Otherwise, fall back to individual environment variables or defaults
const connectionString = process.env.DATABASE_URL || {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "your_password", // **CHANGE THIS IN PRODUCTION**
  host: process.env.DB_HOST || "db", // Use 'db' service name by default in Docker
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "postgres",
};

const pool = new Pool(connectionString);

// Optional: Add an error handler to the pool to log connection errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Consider exiting if a critical error occurs
});

export default pool;
