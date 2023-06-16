const express = require("express");
const book = require("../models/bookModel");
const router = new express.Router();
const multer = require("multer");
const path = require("path");
var fs = require("fs");
const error = require("../middleware/errorHandler");

// upload book image
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Please Choose an Image to Upload not files."), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

// book additions
router.post("/books", upload.single("image"), async (req, res) => {
  try {
    const bookData = new book({
      name: req.body.name,
      price: req.body.price,
      authname: req.body.authname,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
    });
    const createBook = await bookData.save();
    res.status(201).send(createBook);
  } catch (e) {}
});

//get all books
router.get("/books", async (req, res) => {
    try {
        const getBooks = await book.find({
            name: req.body.name,
            price: req.body.price,
            authname: req.body.authname,
            category: req.body.category,
            description: req.body.description,
            image: req.file.filename,

        });
        res.status(200).send(getBooks);
    } catch (e) {

    }
});

//update books
router.put("/books/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const updateBooks = await book.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        res.status(200).send(updateBooks);
    } catch (e) {

    }
});

//delete books

router.delete("/books/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteBooks = await book.findByIdAndDelete(_id);
        res.status(200).send(deleteBooks);
    } catch (e) {

    }
}).catch((e) => {

});





module.exports = express.Router();
