import { Router } from "express";
import { findAllBooks, insertBook } from "../controllers/bookController.js";

const bookRoute = Router();

bookRoute.post("/", insertBook);
bookRoute.get("/", findAllBooks);

export default bookRoute;
