
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const port = process.env.PORT || 5000;
export const databaseUrl = process.env.DATABASE_URL;
export const jwtSecret = process.env.JWT_SECRET;


 import { Sequelize } from 'sequelize';

 dotenv.config();

 export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT) || 5432,
   dialect: 'postgres',
   logging: false,
 });

