import { Sequelize } from 'sequelize';
import 'dotenv/config';

let sequelize;

// If a DATABASE_URL is present (Production/Render), use it directly!
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This line is mandatory for Render cloud connections
      }
    }
  });
} else {
  // Fallback to your local computer settings (Development)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
    }
  );
}

try {
  await sequelize.authenticate();
  console.log('✅ Sequelize successfully connected to the database!');
} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
}

export default sequelize;