import { jest } from '@jest/globals';
import authenticate from '../src/middlewares/authMiddleware.js';

describe('authenticate middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  it('should return 401 if no authorization header', () => {
    authenticate(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Authorization token is required' });
  });

  it('should return 401 if authorization header does not start with Bearer', () => {
    mockReq.headers.authorization = 'InvalidToken';
    authenticate(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Authorization token is required' });
  });

  it('should return 401 for invalid token', () => {
    mockReq.headers.authorization = 'Bearer invalid-token';
    authenticate(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
  });
});