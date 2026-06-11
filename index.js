import app from './src/app.js';
import sequelize from './src/config/db.js';
import { config } from 'dotenv';

import User from './src/models/userModel.js';
import Task from './src/models/taskModel.js';

config();

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
