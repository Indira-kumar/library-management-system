import { Router } from "express";
import bookRoute from "./bookRoute.js";
import userRouter from "./userRoute.js";
const router = Router();

router.use("/books", bookRoute);
router.use("/user", userRouter);

export default router;
