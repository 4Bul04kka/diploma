import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "postgres",
  port: "5432",
  database: "postgres",
});

export default pool;
