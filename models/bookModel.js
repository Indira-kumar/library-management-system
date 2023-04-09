import mongoose from "mongoose";

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    ISBN: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rackNo: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  })
);

export default Book;
