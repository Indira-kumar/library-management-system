import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { register} from "../controllers/userController.js";

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



