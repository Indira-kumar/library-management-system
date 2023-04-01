import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { registerValidation, loginValidation } from "../utils/validation.js";

//Indira original version
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

//Indira's login version
export const login = async (req, res) => {
  try{
    const { email, password } = req.body;
  
    //Validating data before cross checking credentials
    const error = loginValidation(req.body);
    if (error[0].msg) {
      return res.status(400).send(error[0].msg);
    }
  
    //checking whether the user already exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("Account with the given Email does  not exist");
    }
  
    //Checking password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");
  
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    // const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
    res.header("auth-token", token).send(token);
  }catch(error){
    console.log(error)
  }
  };

export const logout = async (req, res) => {
    try {
      res.setHeader('auth-token', '');
      res.status(200).send('User successfully logged out');
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  };