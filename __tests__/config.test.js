import { jwtSecret } from '../src/config/config.js';

describe('config', () => {
  it('should export jwtSecret', () => {
    expect(jwtSecret).toBeDefined();
    expect(typeof jwtSecret).toBe('string');
  });
});