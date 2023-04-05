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

export const findBook = async (req, res) => {
      try {
        const book = await Book.findOne({ ISBN: req.params.isbn})
        res.send(book);
      } catch(err){ 
        res.status(500).send(err);
      }
}


export const deleteBook = async (req, res) => {
      try {
          const delbook = await Book.deleteOne({ ISBN: req.params.isbn})
          if(!delbook) res.status(404).send("Item not found, please check ID");
          res.status(200).send()
      } catch(err) {
          res.status(500).send(err);
      }
}

export const updateBook = async (req, res) => {
      try {
          const uptbook = await Book.updateOne({ ISBN: req.params.isbn},req.body)
          // await Book.save();
          res.send(uptbook);
      } catch(err) {
          res.status(500).send(err);
      }
}
