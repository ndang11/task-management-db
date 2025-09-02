import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '7d',
  });
};

export default generateToken;
