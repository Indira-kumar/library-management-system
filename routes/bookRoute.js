import { Router } from "express";
import { findAllBooks, insertBook, findBook, deleteBook, updateBook, borrowBook, checkBorrowed, returnBook } from "../controllers/bookController.js";
import { authorizeAdmin } from "../middlewares/authorize.js";

const bookRoute = Router();

bookRoute.post("/", authorizeAdmin , insertBook);
bookRoute.get("/", findAllBooks);
bookRoute.get("/:isbn", findBook);
bookRoute.put("/", borrowBook);
bookRoute.get("/", checkBorrowed);
bookRoute.put("/", returnBook);
bookRoute.delete("/:isbn", authorizeAdmin, deleteBook);
bookRoute.patch("/:isbn", authorizeAdmin, updateBook);

export default bookRoute;
