const express = require("express");
const book = require("../models/bookModel");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var fs = require("fs");
const error = require("../middleware/errorHandler");
const { addBook, editBook } = require("../controllers/bookController");

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
router.route("/")
  // .post(addBook)
  .post(async(req,res) => {
    const bookData = new book({
      name: req.body.name,
      price: req.body.price,
      authname: req.body.authname,
      category: req.body.category,
      description: req.body.description,
    //   image: req.file.filename,
    });
    const createBook = await bookData.save();
    res.status(201).send(createBook);
  })

//get all books
router.route('/').get(async (req, res) => {
        const getBooks = await book.find({
            // name: req.body.name,
            // price: req.body.price,
            // authname: req.body.authname,
            // category: req.body.category,
            // description: req.body.description,
            // // image: req.file.filename,

        });
        res.status(200).send(getBooks);

});

//update books
router.route("/:id")
  // .put(editBook)
  .put(async(req,res) => {
    const _id = req.params.id;
    const existingBook = await book.findById(_id)
    return res.send(existingBook)
  })

//delete books

router.delete("/:id", async (req, res) => {
   
        const _id = req.params.id;
        const deleteBooks = await book.findByIdAndDelete(_id);
        res.status(200).send(deleteBooks); 
   
})




module.exports = router;