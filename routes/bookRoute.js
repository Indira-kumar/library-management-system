import { Router } from "express";
import { findAllBooks, insertBook, findBook, deleteBook, updateBook } from "../controllers/bookController.js";

const bookRoute = Router();

bookRoute.post("/", insertBook);
bookRoute.get("/", findAllBooks);
bookRoute.get("/:isbn", findBook);
bookRoute.delete("/:isbn", deleteBook);
bookRoute.patch("/:isbn", updateBook);

export default bookRoute;
