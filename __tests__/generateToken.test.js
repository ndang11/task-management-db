import generateToken from '../src/utils/generateToken.js';

describe('generateToken', () => {
  it('should generate a valid JWT token', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = generateToken(user);

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should contain user id and email in token payload', () => {
    const user = { id: 2, email: 'user@test.com' };
    const token = generateToken(user);

    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    expect(payload.id).toBe(2);
    expect(payload.email).toBe('user@test.com');
  });
});