import {Router} from "express";
import { register } from "../controllers/userController";

const authRouter = Router();
authRouter.post("/register", register);


export default authRouter;
