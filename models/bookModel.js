const mongoose = require("mongoose");


const validator = require("mongoose-unique-validator")
const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  price: {
    type: String,
    required: true,
  },

  authname: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
});

bookSchema.plugin(validator);
const Book = mongoose.model('book', bookSchema);
model.exports = Book;