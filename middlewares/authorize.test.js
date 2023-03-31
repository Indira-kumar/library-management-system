import { authorizeAdmin, authorizeStudent } from './authorize.js';

describe('authorizeAdmin middleware', () => {
  test('should call next() if user is a librarian', () => {
    const req = {
      user: {
        role: 'librarian'
      }
    };
    const res = {
      send: jest.fn()
    };
    const next = jest.fn();

    authorizeAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should send "Authorization Denied because of no authorizeAdmin permission" if user is not a librarian', () => {
    const req = {
      user: {
        role: 'student'
      }
    };
    const res = {
      send: jest.fn()
    };
    const next = jest.fn();

    authorizeAdmin(req, res, next);

    expect(res.send).toHaveBeenCalledWith('Authorization Denied because of no admin permission');
  });
});

describe('authorizeStudent middleware', () => {
  test('should call next() if user is a authorizeStudent', () => {
    const req = {
      user: {
        role: 'student'
      }
    };
    const res = {
      send: jest.fn()
    };
    const next = jest.fn();

    authorizeStudent(req, res, next);

    expect(next).toHaveBeenCalled();
  });
//Asumming that librarian should not be allowed to use authorizeStudent end points such as registering book, etc. this test case has been written
  test('should send "Authorization Denied" if user is not a authorized Student', () => {
    const req = {
      user: {
        role: 'librarian'
      }
    };
    const res = {
      send: jest.fn()
    };
    const next = jest.fn();

    authorizeStudent(req, res, next);

    expect(res.send).toHaveBeenCalledWith('Authorization Denied');
  });
});
