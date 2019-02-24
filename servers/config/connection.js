import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

//console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
console.log("Connected to the db");

export default pool;
