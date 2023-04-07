import { Router } from "express";
import { findAllBooks, insertBook, findBook, deleteBook, updateBook, borrowBook, checkBorrowed, returnBook } from "../controllers/bookController.js";
import { verify } from "jsonwebtoken";

const bookRoute = Router();

bookRoute.post("/", insertBook);
bookRoute.get("/", findAllBooks);
bookRoute.get("/:isbn", findBook);
bookRoute.put("/", verify, borrowBook);
bookRoute.get("/", checkBorrowed);
bookRoute.put("/", returnBook);
bookRoute.delete("/:isbn", deleteBook);
bookRoute.patch("/:isbn", updateBook);

export default bookRoute;
