import { Router } from "express";
import { insertBook } from "../controllers/bookController.js";

const bookRoute = Router();

bookRoute.post("/", insertBook);

export default bookRoute;
