import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerValidation, loginValidation } from "../utils/validation.js";

export const register = async (req, res) => {
  //Validating data before user creation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  else {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          return res.status(409).send(error.details[0].message);
        }
        else {
          return bcrypt.genSalt(10);
        }
      })
      .then((salt) => {
        return bcrypt.hash(req.body.password, salt);
      })
      .then((hash) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        return user.save();
      })
      .then((user) => {
        res.send({ user: user._id, message: "User created" });
      })
      .catch((err) => console.log(err));
  }
};

export const login = async (req, res) => {

  //Validating data before cross checking credentials
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  else {
    //checking whether the user already exists in the database
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).send("Invalid email or password");
        }
        else {
          const isMatch = bcrypt.compare(req.body.password, user.password);
          if (!isMatch) {
            return res.status(401).send("Invalid email or password");
          }
          else {
            const token = jwt.sign(
              { _id: user._id, role: user.role },
              process.env.JWT_SECRET
            );
            return res.header("auth-token", token).send(token);
          }
        }
      })
      .catch((err) => console.log(err));
  }
};