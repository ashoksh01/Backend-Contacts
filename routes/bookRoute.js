const express = require("express");
const router = express.Router();
const {
  addBook,
  deleteBooks,
  editBook,
  detail,
  listBooks,
} = require("../controllers/bookController");
const upload = require("../config/multer/multer");

router.route("/").get(listBooks);
router.route("/addBook").post(upload.single("image"), addBook);
router.route("/deleteBook/:id").delete(deleteBooks);
router.route("/updateBook/:id").put(upload.single("image"), editBook);
router.route("/detail/:id").get(detail);

module.exports = router;
