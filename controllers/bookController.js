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

export const borrowBook = (req, res) => {
  const { userId } = req.user._userid;
  const { ISBN } = req.body.ISBN;
  
  // update existing table by decrementing qty by 1 and adding user to the user field
  Book.findOneAndUpdate(
    { ISBN, quantity: { $gt: 0 } },
    { $addToSet: { users: userId }, $inc: { quantity: -1 } },
    { new: true }
  )
    .then((book) => {
      if (!book) {
        return res.status(404).send("Book not available");
      }
      res.status(200).send(book);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const checkBorrowed = (req, res) => {
  console.log(req.user)
  const { userId } = req.user._userid;
  const { ISBN } = req.body.ISBN;

  Book.findOne({ ISBN: bookISBN })
    .populate("users", "_id") 
    .then((book) => {
      if (!book) {
        return res.status(404).send("Book not found");
      }
      const borrowedByUser = book.users.some((user) => user._id.equals(userId));
      res.status(200).send({ borrowed: borrowedByUser });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const returnBook = (req, res) => {
  const { userId } = req.user._userid;
  const { ISBN } = req.body.ISBN;
 
  // increment qty by 1 and remove user using pull function
  Book.findOneAndUpdate(
    { ISBN: bookISBN, users: userId },
    { $pull: { users: userId }, $inc: { quantity: 1 } }, 
    { new: true }
  )
    .then((book) => {
      if (!book) {
        return res.status(404).send("Book not found for user");
      }
      res.status(200).send(book);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

