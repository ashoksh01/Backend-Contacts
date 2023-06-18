const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel")

const addBook = asyncHandler(async(req,res) => {
console.log(req.body)
        const bookData = new Book({
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


const editBook = asyncHandler(async(req,res) => {
    const _id = req.params.id;
    console.log(_id,"id is")
    const existingBook = await book.findById(_id)
    console.log(existingBook)
    return res.send(existingBook)
    // const updateBooks = await book.findByIdAndUpdate(_id, req.body, {
    //     new: true,
    // });
    // console.log(updateBooks,"sadsa")
    // res.status(200).send(updateBooks);
})

module.exports = {
    addBook,
    editBook,
    
}