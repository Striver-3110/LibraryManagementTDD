const { availableMemory } = require('process');
const Book = require('../models/BookModel');
const { realpathSync } = require('fs');

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
        message: "Some error ocurred while adding a book, please try again!",
      });
    } catch (error) {
      console.log("error in user Sign-in Auth.js", error.message);
      res.status(500).json({
        success: false,
        message: "Error: Internal Server Error, while adding a book!",
      });
    }
  };
  


  exports.BorrowBookController = async (req, res) => {
    try {
      const { ISBN } = req.body;
  
      // check weather the book is received properly
      if (!ISBN) {
        return res.status(404).json({
          success: false,
          message: "Each field is required!",
        });
      }
  
      const book = await Book.findOne({ ISBN });
      if (!book) {
        return res.status(400).json({
          success: false,
          message: "book does not exist!",
        });
      }
      // check weather the book is available or not
      if (!book.available) {
        return res.status(400).json({
          success: false,
          message: "sorry the book is not available",
          book,
        });
      }
  
      const remainingCopies = book.availableCopies - 1;
      let isAvailable = book.available;
      if (remainingCopies <= 0) {
        isAvailable = false;
      }
  
      const updatedBook = await Book.findOneAndUpdate(
        { ISBN },
        {
          availableCopies: remainingCopies,
          available: isAvailable,
        },
        { new: true }// returns updated document
      );
  
      console.log(updatedBook);
      return res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        updatedBook,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error: Internal Server Error, while borrowing a book!",
      });
    }
  };
  

  exports.ReturnBookController = async (req, res) =>{
    try {
      const {
        ISBN
      } = req.body;
      if(!ISBN){
        return res.status(400).json({
          success:false,
          message:'ISBN is required!'
        })
      }
      const returnedBook = await Book.findOne({ISBN})

      if(!returnedBook){
        return res.status(404).json({
          success:false,
          message:"Sorry the book is not allowed to be returned"
        })
      }

      let isAvailable = false;
      const remainingCopies = returnedBook.availableCopies + 1;
      if(remainingCopies >= 0){
        isAvailable = true;
      }
      const updatedBook = await Book.findOneAndUpdate({ISBN},{
        available:isAvailable,
        availableCopies:remainingCopies
      },
      {new:true}
    )
      if(updatedBook){
        return res.status(200).json({
          success:true,
          message:"Book returned successfully.",
          updatedBook
        })
      }
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error,
      })
    }
  }


  exports.allAvailableBooks = async (req,res) => {
    try {
      const availableBooks = await Book.find({available:true})
      if(!availableBooks){
        return res.status(400).json({
          success:false,
          message:"Sorry no book is available"
        })
      }

      return res.status(200).json({
        success:true,
        message:"All the available books returned successfully",
        availableBooks
      })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error,
      })
    }
  }