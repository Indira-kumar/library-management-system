import {Router} from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {authorizeAdmin, authorizeStudent} from "../middlewares/authorize.js";

const privateRoute = Router();
privateRoute.get("/", verifyToken, authorizeStudent,  (req, res) => {
  console.log(req.user);
  res.json({ message: "You have accessed a private route" });
});

export default privateRoute;
