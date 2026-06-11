import request from 'supertest';
import app from '../src/app.js';
import sequelize from '../src/config/db.js';

describe('API Routes', () => {
  afterAll(async () => {
    await sequelize.close();
  });
  describe('POST /api/auth/register', () => {
    it('should return validation error without required fields', async () => {
      const response = await request(app).post('/api/auth/register').send({});
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 401 for invalid credentials', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@test.com',
        password: 'wrong',
      });
      expect(response.status).toBe(401);
    });
  });
});