import pool from '../configs/db.config.js';
import logger from "../configs/logger.config.js"

export const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS newtable (
    id UUID PRIMARY KEY NOT NULL, 
    string VARCHAR(150) NOT NULL, 
    bool BOOLEAN, 
    created_at TIMESTAMP
  );`;

  try {
    await pool.query(query);
    logger.info('Table created');
  } catch (err) {
    logger.error('error creating  table', err);
  }
};