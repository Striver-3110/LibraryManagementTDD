// const { availableMemory } = require("process");
// const Book = require("../models/BookModel");
// const { realpathSync } = require("fs");

// exports.AddBookController = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { ISBN, title, author, yearOfPublish, available, availableCopies } =
//       req.body;
//     if (
//       !ISBN ||
//       !title ||
//       !author ||
//       !yearOfPublish ||
//       !available ||
//       !availableCopies
//     ) {
//       return res
//         .status(403)
//         .json({ success: false, message: "All fields are required" });
//     }
//     const existingBook = await Book.findOne({ ISBN });
//     if (existingBook) {
//       console.log("book already exist");
//       return res
//         .status(400)
//         .json({ success: false, message: "Book already exists" });
//     }

//     const newBook = await Book.create({
//       ISBN,
//       title,
//       author,
//       yearOfPublish,
//       available,
//       availableCopies,
//     });

//     if (newBook) {
//       return res.status(200).json({
//         success: true,
//         message: "Book added successfully!",
//         newBook,
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: "Some error ocurred while adding a book, please try again!",
//     });
//   } catch (error) {
//     console.log("error in user Sign-in Auth.js", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Error: Internal Server Error, while adding a book!",
//     });
//   }
// };

// exports.BorrowBookController = async (req, res) => {
//   try {
//     const { ISBN } = req.body;

//     // check weather the book is received properly
//     if (!ISBN) {
//       return res.status(404).json({
//         success: false,
//         message: "Each field is required!",
//       });
//     }

//     const book = await Book.findOne({ ISBN });
//     if (!book) {
//       return res.status(400).json({
//         success: false,
//         message: "book does not exist!",
//       });
//     }
//     // check weather the book is available or not
//     if (!book.available) {
//       return res.status(400).json({
//         success: false,
//         message: "sorry the book is not available",
//         book,
//       });
//     }

//     const remainingCopies = book.availableCopies - 1;
//     let isAvailable = book.available;
//     if (remainingCopies <= 0) {
//       isAvailable = false;
//     }

//     const updatedBook = await Book.findOneAndUpdate(
//       { ISBN },
//       {
//         availableCopies: remainingCopies,
//         available: isAvailable,
//       },
//       { new: true } // returns updated document
//     );

//     console.log(updatedBook);
//     return res.status(200).json({
//       success: true,
//       message: "Book borrowed successfully",
//       updatedBook,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error: Internal Server Error, while borrowing a book!",
//     });
//   }
// };

// exports.ReturnBookController = async (req, res) => {
//   try {
//     const { ISBN } = req.body;
//     if (!ISBN) {
//       return res.status(400).json({
//         success: false,
//         message: "ISBN is required!",
//       });
//     }
//     const returnedBook = await Book.findOne({ ISBN });

//     if (!returnedBook) {
//       return res.status(404).json({
//         success: false,
//         message: "Sorry the book is not allowed to be returned",
//       });
//     }

//     let isAvailable = false;
//     const remainingCopies = returnedBook.availableCopies + 1;
//     if (remainingCopies >= 0) {
//       isAvailable = true;
//     }
//     const updatedBook = await Book.findOneAndUpdate(
//       { ISBN },
//       {
//         available: isAvailable,
//         availableCopies: remainingCopies,
//       },
//       { new: true }
//     );
//     if (updatedBook) {
//       return res.status(200).json({
//         success: true,
//         message: "Book returned successfully.",
//         updatedBook,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

// exports.allAvailableBooks = async (req, res) => {
//   try {
//     const availableBooks = await Book.find({ available: true });
//     if (!availableBooks) {
//       return res.status(400).json({
//         success: false,
//         message: "Sorry no book is available",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "All the available books returned successfully",
//       availableBooks,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

// exports.allBooks = async (req, res) => {
//   try {
//     const allBooks = await Book.find();
//     if (!allBooks) {
//       return res.status(400).json({
//         success: false,
//         message: "Sorry no books are in library",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "All the books returned successfully",
//       allBooks,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };
const { validationResult } = require('express-validator');
const BookService = require('../services/BookServices');

/**
 * Controller to handle adding a new book to the library.
 * Validates request data, checks if the book already exists, and adds the book if not.
 * @param {object} req - The request object containing book details.
 * @param {object} res - The response object used to send a response.
 */
exports.AddBookController = async (req, res) => {
  try {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      });
    }

    const { ISBN, title, author, yearOfPublish, available, availableCopies } = req.body;

    // Check if the book already exists in the library
    const existingBook = await BookService.findBookByISBN(ISBN);
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: 'Book already exists',
      });
    }

    // Add new book to the library
    const newBook = await BookService.createBook({ ISBN, title, author, yearOfPublish, available, availableCopies });

    return res.status(200).json({
      success: true,
      message: 'Book added successfully!',
      newBook,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in AddBookController:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * Controller to handle borrowing a book from the library.
 * Validates request data and updates the book's status to borrowed if it exists.
 * @param {object} req - The request object containing the book ISBN.
 * @param {object} res - The response object used to send a response.
 */
exports.BorrowBookController = async (req, res) => {
  try {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      });
    }

    const { ISBN } = req.body;

    // Validate that ISBN is provided
    if (!ISBN) {
      return res.status(400).json({
        success: false,
        message: 'ISBN is required!',
      });
    }

    // Attempt to borrow the book by ISBN
    const updatedBook = await BookService.borrowBookByISBN(ISBN);

    if (!updatedBook) {
      return res.status(400).json({
        success: false,
        message: 'Book does not exist!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      updatedBook,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in BorrowBookController:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * Controller to handle returning a borrowed book to the library.
 * Validates request data and updates the book's status to available if it exists.
 * @param {object} req - The request object containing the book ISBN.
 * @param {object} res - The response object used to send a response.
 */
exports.ReturnBookController = async (req, res) => {
  try {
    // Validate request data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      });
    }

    const { ISBN } = req.body;

    // Validate that ISBN is provided
    if (!ISBN) {
      return res.status(400).json({
        success: false,
        message: 'ISBN is required!',
      });
    }

    // Attempt to return the book by ISBN
    const updatedBook = await BookService.returnBookByISBN(ISBN);

    if (!updatedBook) {
      return res.status(400).json({
        success: false,
        message: 'Book does not exist',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book returned successfully.',
      updatedBook,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in ReturnBookController:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * Controller to fetch and return all available books in the library.
 * @param {object} req - The request object (no body required).
 * @param {object} res - The response object used to send a response.
 */
exports.allAvailableBooks = async (req, res) => {
  try {
    // Fetch all available books from the service
    const availableBooks = await BookService.getAllAvailableBooks();

    if (!availableBooks.length) {
      return res.status(400).json({
        success: false,
        message: 'No books available',
        availableBooks:[]
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'All the available books returned successfully',
      availableBooks,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in allAvailableBooks:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/**
 * Controller to fetch and return all books in the library.
 * @param {object} req - The request object (no body required).
 * @param {object} res - The response object used to send a response.
 */
exports.allBooks = async (req, res) => {
  try {
    // Fetch all books from the service
    const allBooks = await BookService.getAllBooks();

    if (!allBooks.length) {
      return res.status(400).json({
        success: false,
        message: 'No books found in the library',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'All books retrieved successfully',
      allBooks,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in allBooks:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
