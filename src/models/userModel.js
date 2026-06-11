import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
