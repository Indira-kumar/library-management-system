import jwt from "jsonwebtoken";
import {verifyToken} from "./verifyToken";

describe("verifying Token", () => {
  it("should return 'Access Denied' if no token is provided", () => {
    const req = {
      header: jest.fn(() => undefined),
    };
    const res = {
      send: jest.fn((message) => message),
    };
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith("auth-token");
    expect(res.send).toHaveBeenCalledWith("Access Denied");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 'Invalid Token' if an invalid token is provided", () => {
    const req = {
      header: jest.fn(() => "invalid-token"),
    };
    const res = {
      send: jest.fn((message) => message),
    };
    const next = jest.fn();

    jwt.verify = jest.fn(() => {
      throw new Error("invalid signature");
    });

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith("auth-token");
    expect(res.send).toHaveBeenCalledWith("Invalid Token");
    expect(next).not.toHaveBeenCalled();
  });

  it("should set the user on the request and call next if a valid token is provided", () => {
    const req = {
      header: jest.fn(() => "valid-token"),
      user: undefined,
    };
    const res = {};
    const next = jest.fn();

    jwt.verify = jest.fn(() => ({ _id: "user-id" }));

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith("auth-token");
    expect(req.user).toEqual({ _id: "user-id" });
    expect(next).toHaveBeenCalled();
  });
});
