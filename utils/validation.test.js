import { registerValidation, loginValidation } from './validation.js';

describe('Validation', () => {
  describe('registerValidation', () => {
    it('should validate a valid registration data', () => {
      const data = {
        name: 'testuser',
        email: 'testuser@example.com',
        password: 'Password1@',
      };

      const { error } = registerValidation(data);

      expect(error).toBeUndefined();
    });

    it('should not validate an invalid registration data', () => {
      const data = {
        name: '',
        email: 'invalidemail',
        password: 'password',
      };

      const { error } = registerValidation(data);

      expect(error).toBeDefined();
    });
  });

  describe('loginValidation', () => {
    it('should validate a valid login data', () => {
      const data = {
        email: 'testuser@example.com',
        password: 'Password1@',
      };

      const { error } = loginValidation(data);

      expect(error).toBeUndefined();
    });

    it('should not validate an invalid login data', () => {
      const data = {
        email: 'invalidemail',
        password: '',
      };

      const { error } = loginValidation(data);

      expect(error).toBeDefined();
    });
  });
});
