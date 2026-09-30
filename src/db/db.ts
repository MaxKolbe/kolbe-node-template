import { Pool } from "pg";
import { env } from "../configs/env.config.js";
import logger from "../configs/logger.config.js";

const dbMap = new Map([
  ["development", env.PG_DATABASE_DEV_URL],
  ["test", env.PG_DATABASE_TEST_URL],
  ["production", env.PG_DATABASE_PROD_URL],
]);
const dburl = dbMap.get(env.NODE_ENV);

const pool = new Pool({
  connectionString: dburl,
  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export async function connectDatabase() {
  try {
    const client = await pool.connect();
    client.release();
    logger.info("Connected to database Pool successfully");
  } catch (err) {
    logger.error("Failed to connect to database:", err);
    process.exit(1);
  }
}

pool.on("error", (err, client) => {
  logger.error("Unexpected error on idle client", { err });
});

export default pool;
