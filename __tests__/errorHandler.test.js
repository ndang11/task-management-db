import { jest } from '@jest/globals';
import { errorHandler } from '../src/middlewares/errorHandler.js';

describe('errorHandler middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should return 500 status for errors without statusCode', () => {
    const err = new Error('Test error');
    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Test error',
    });
  });

  it('should return custom statusCode if valid', () => {
    const err = new Error('Not found');
    err.statusCode = 404;
    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Not found',
    });
  });

  it('should return 500 if statusCode is out of range', () => {
    const err = new Error('Bad request');
    err.statusCode = 50;
    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
  });

  it('should call next(err) if headers already sent', () => {
    const err = new Error('Test error');
    mockRes.headersSent = true;
    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(err);
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('should use default message if error has no message', () => {
    const err = new Error();
    err.message = '';
    errorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Internal Server Error',
    });
  });
});