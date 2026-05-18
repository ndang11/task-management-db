import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Automatically loads your .env file

// Initialize Sequelize with your environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    dialect: 'postgres',
    logging: false,           
  }
);

// Test the connection immediately
try {
  await sequelize.authenticate();
  console.log('✅ Sequelize successfully connected to the PostgreSQL database!');
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
}

// CRITICAL: This is the default export your model is looking for!
export default sequelize;