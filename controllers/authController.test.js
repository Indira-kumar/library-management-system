import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import {register, login} from "./authController.js";
// Mock the User model and its methods
jest.mock("../models/User.js", () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

describe("register", () => {
  it("should return 400 if input is invalid", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });

  it("should return 409 if email already exists", async () => {
    const req = { body: { email: "test@example.com", password:"Abcdef@1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const user = { email: "test@example.com" };

    User.findOne.mockResolvedValue(user);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalled();
  });

  it("should create a new user and return a success message", async () => {
    const req = { body: { name: "Test User", email: "test@example.com", password: "password" } };
    const res = {
      send: jest.fn(),
    };
    const salt = "salt";
    const hash = "hash";
    const user = { _id: "123", name: "Test User", email: "test@example.com" };

    bcrypt.genSalt.mockResolvedValue(salt);
    bcrypt.hash.mockResolvedValue(hash);
    User.findOne.mockResolvedValue(null);
    User.save.mockResolvedValue(user);

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, salt);
    expect(User.save).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ user: user._id, message: "User created" });
  });
});

describe("login", () => {
  it("should return 400 if input is invalid", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalled();
  });

  it("should return 401 if user doesn't exist", async () => {
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Invalid email or password");
  });

  it("should return 401 if password is incorrect", async () => {
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const user = { password: "wrong_password" };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  })
})
