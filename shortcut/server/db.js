import pkg from "pg";
const { Pool } = pkg;

// Configure the pool using DATABASE_URL or individual environment variables
const poolConfig = process.env.DATABASE_URL ?
  { connectionString: process.env.DATABASE_URL } :
  { // Fallback to individual variables if DATABASE_URL is not set
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "your_password", // **CHANGE THIS IN PRODUCTION**
    host: process.env.DB_HOST || "db", // Use 'db' service name by default in Docker
    port: process.env.DB_PORT || "5432",
    database: process.env.DB_NAME || "postgres",
  };

const pool = new Pool(poolConfig);

// Optional: Add an error handler to the pool to log connection errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1); // Consider exiting if a critical error occurs
});

export default pool;
