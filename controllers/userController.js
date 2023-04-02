import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { registerValidation, loginValidation } from "../utils/validation.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //Validating data before user creation
  const error = registerValidation(req.body);
  if (error[0].msg) {
    return res.status(400).send(error[0].msg);
  }

  //checking whether the user already exists in the database
  try{
    const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.send("Email already exists");
  }
  }catch(err){
    console.log(err);
  }

  try{
      //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating a new user
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
    
    const savedUser = await user.save();
    res.send({ user: savedUser._id, message: "User created" });
  } catch (err) {
    res.status(400).send(err);
  }
};

