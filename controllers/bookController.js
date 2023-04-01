import Book from "../models/bookModel.js";

export const insertBook = (req, res) => {
  const book = new Book({
    ISBN: req.body.ISBN,
    name: req.body.name,
    author: req.body.author,
    quantity: req.body.quantity,
    rackNo: req.body.rackNo,
  });

  book
    .save()
    .then(() => {
      res.status(201).send(book);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const findAllBooks = (req, res) => {
  Book.find()
    .then((books) => {
      res.status(200).send(books);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
