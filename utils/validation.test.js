import { registerValidation, loginValidation } from './validation';

describe('registerValidation', () => {
  it('returns an error if name is missing', () => {
    const data = { email: 'test@test.com', password: 'Test1234$' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'please fill in all fields' });
  });

  it('returns an error if email is missing', () => {
    const data = { name: 'Test', password: 'Test1234$' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'please fill in all fields' });
  });

  it('returns an error if password is missing', () => {
    const data = { name: 'Test', email: 'test@test.com' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'please fill in all fields' });
  });

  it('returns an error if password is too short', () => {
    const data = { name: 'Test', email: 'test@test.com', password: 'Test1$' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'password should have one small case, a capital letter, a symbol and a number and also the length should be greater than 8 and less than 20' });
  });

  it('returns an error if password is too long', () => {
    const data = { name: 'Test', email: 'test@test.com', password: 'Test1234$Test1234$Test1234$' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'password should have one small case, a capital letter, a symbol and a number and also the length should be greater than 8 and less than 20' });
  });

  it('returns an error if password does not meet requirements', () => {
    const data = { name: 'Test', email: 'test@test.com', password: 'testpassword' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'password should have one small case, a capital letter, a symbol and a number and also the length should be greater than 8 and less than 20' });
  });

  it('returns an error if email is invalid', () => {
    const data = { name: 'Test', email: 'test@test', password: 'Test1234$' };
    const result = registerValidation(data);
    expect(result).toContainEqual({ msg: 'Enter a valid email address' });
  });

  it('returns no errors if all fields are valid', () => {
    const data = { name: 'Test', email: 'test@test.com', password: 'Test1234$' };
    const result = registerValidation(data);
    expect(result).toEqual([{msg: null}]);
  });
});

describe('loginValidation', () => {
  it('returns an error if email is invalid', () => {
    const data = { email: 'test@test', password: 'Test1234$' };
    const result = loginValidation(data);
    expect(result).toContainEqual({ msg: 'Enter a valid email address' });
  });

  it('returns no errors if email is valid', () => {
    const data = { email: 'test@test.com' };
    const result = loginValidation(data);
    expect(result).toEqual([{msg: null}]);
  });
});
