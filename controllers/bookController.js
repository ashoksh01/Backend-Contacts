const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const fs = require("fs");
const path = require("path");

const listBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});

  return res.send(books);
});

const addBook = asyncHandler(async (req, res) => {
  try {
    console.log(req?.file);
    const bookData = new Book({
      ...req.body,
      // image: req.file.image,
    });
    const createBook = await bookData.save();
    // console.log("object");
    // fs.unlink(req.file.path, (err) => {
    //   console.log(err);
    // });
    res.status(201).send(createBook);
  } catch (error) {
    res.json(error.message);
  }
});

const editBook = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const updateBooks = await Book.findByIdAndUpdate(
    _id,
    { ...req.body, image: req.file.image },
    {
      new: true,
    }
  );
  res.status(200).send("update");
});

const detail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const existingBook = await Book.findById(id);
  console.log(existingBook);
  return res.send(existingBook);
});
const deleteBooks = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const delete_ = await Book.findOneAndDelete({ _id });
  return res.send("Delete Book");
});

module.exports = {
  addBook,
  editBook,
  deleteBooks,
  detail,
  listBooks,
};
