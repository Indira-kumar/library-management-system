import {Router} from "express";
import {register, login, logout} from "../controllers/userController.js"
import {verifyToken} from "../middlewares/verifyToken.js";

const userRouter = Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
authRouter.delete("/logout",verifyToken, logout);

export default userRouter;
