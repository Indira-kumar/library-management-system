import {Router} from "express";
import {register, login, logout} from "../controllers/authController.js"

const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);

export default authRouter;
