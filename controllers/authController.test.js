import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import { register, login, logout } from "../controllers/authController.js";

describe("register function", () => {
  it("should return 400 if invalid data is provided", async () => {
    const req = {
      body: {
        name: "student",
        email: "example@gmail.com",
        password: "123456",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    // expect(res.send).toHaveBeenCalledWith(
    //   "Validation failed: email must be a valid email"
    // );
  });

  it("should return 400 if user with email already exists", async () => {
    const req = {
      body: {
        name: "teststudent1",
        email: "teststudent1@gmail.com",
        password: "Abcedf@1",
      },
    };
    const res = {
      send: jest.fn(),
    };
    User.findOne = jest.fn(() => Promise.resolve({ email: req.body.email }));
    await register(req, res);
    expect(res.send).toHaveBeenCalledWith("Email already exists");
  });

  it("should create a new user with hashed password and return user id and message", async () => {
    const req = {
      body: {
        name: "teststudent2",
        email: "teststudent2@gmail.com",
        password: "Abcedf@1",
      },
    };
    const res = {
      send: jest.fn(),
    };
    User.findOne = jest.fn(() => Promise.resolve(null));
    bcrypt.genSalt = jest.fn(() => Promise.resolve("salt"));
    bcrypt.hash = jest.fn(() => Promise.resolve("hashedPassword"));
    const saveMock = jest.fn(() =>
      Promise.resolve({ _id: "user_id", name: "John", email: "john@gmail.com" })
    );
    User.prototype.save = saveMock;
    await register(req, res);
    expect(saveMock).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      user: "user_id",
      message: "User created",
    });
  });
});

describe("login function", () => {
  it("should return 400 if invalid data is provided", async () => {
    const req = {
      body: {
        email: "wrongemail.example.com",
        password: "Abcdef@1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Enter a valid email address");
  });

  it("should return 400 if user with email does not exist", async () => {
    const req = {
      body: {
        email: "doesNotExist@example.com",
        password: "Abcdef@1",
      },
    };
    const res = {
      status:jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    User.findOne = jest.fn(() => Promise.resolve(null));
    await login(req, res);
    expect(res.send).toHaveBeenCalledWith(
      "Account with the given Email does  not exist"
    );
  });

  it("should return 400 if invalid password is provided", async () => {
    const req = {
      body: {
        email: "teststudent1@gmail.com",
        password: "Abcedf@01",
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    User.findOne = jest.fn(() => Promise.resolve({ password: "hashedPassword" }));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid password");
});

});


describe('logout controller', () => {
  it('should clear the auth-token header and return a 200 status code with success message', async () => {
    const req = {};
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await logout(req, res);
    expect(res.setHeader).toHaveBeenCalledWith('auth-token', '');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('User successfully logged out');
  });

  it('should return a 500 status code with an error message if an error occurs', async () => {
    const req = {};
    const res = {
      setHeader: jest.fn(() => { throw new Error() }),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await logout(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server Error');
  });
});

