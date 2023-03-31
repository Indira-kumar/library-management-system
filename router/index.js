import {Router} from "express";
import authRoute from "./authRoute.js";
import privateRoute from "./privateRoute.js";

const router = Router();
router.use("/user", authRoute);
router.use("/private", privateRoute);

export default router;
