import dotenv from "dotenv";
import path from "path";
// Init
dotenv.config({ path: path.join((process.cwd(), ".env")) });
export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  store_id: process.env.store_id,
  store_pass: process.env.store_pass,
};