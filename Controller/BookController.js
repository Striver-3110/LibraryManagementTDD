const Book = require('../models/BookModel')

exports.AddBookController = async (req, res) => {
    try {
      console.log(req.body);
      const { ISBN, title, author, yearOfPublish, available, availableCopies } =
        req.body;
      if (
        !ISBN ||
        !title ||
        !author ||
        !yearOfPublish ||
        !available ||
        !availableCopies
      ) {
        return res
          .status(403)
          .json({ success: false, message: "All fields are required" });
      }
  
      const existingBook = await Book.findOne({ ISBN });
      if (existingBook) {
        console.log("book already exist")
        return res
          .status(400)
          .json({ success: false, message: "Book already exists" });
      }
  
      const newBook = await Book.create({
        ISBN,
        title,
        author,
        yearOfPublish,
        available,
        availableCopies,
      });
  
      if (newBook) {
        return res.status(200).json({
          success: true,
          message: "Book added successfully!",
          newBook,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Some error occured while adding a book, please try again!",
      });
    } catch (error) {
      console.log("error in user Sign-in Auth.js", error.message);
      res.status(500).json({
        success: false,
        message: "Error: Internal Server Error, while adding a book!",
      });
    }
  };
  