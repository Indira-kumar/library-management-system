import { Router } from "express";
import { borrowBook, checkBorrowed, findAllBooks, insertBook, returnBook } from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const bookRoute = Router();

bookRoute.post("/", insertBook);
bookRoute.get("/", findAllBooks);
bookRoute.put("/",verifyToken, borrowBook);
bookRoute.get("/", checkBorrowed);
bookRoute.put("/", returnBook);

export default bookRoute;
