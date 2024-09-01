const Book = require('../models/BookModel');

const findBookByISBN = async (ISBN) => {
  return await Book.findOne({ ISBN });
};

const createBook = async ({ ISBN, title, author, yearOfPublish, available, availableCopies }) => {
  return await Book.create({
    ISBN,
    title,
    author,
    yearOfPublish,
    available,
    availableCopies,
  });
};

const borrowBookByISBN = async (ISBN) => {
  const book = await findBookByISBN(ISBN);

  if (!book || !book.available) {
    return null; // Book not available or does not exist
  }

  const remainingCopies = book.availableCopies - 1;
  const isAvailable = remainingCopies > 0;

  return await Book.findOneAndUpdate(
    { ISBN },
    {
      availableCopies: remainingCopies,
      available: isAvailable,
    },
    { new: true } // Return updated document
  );
};

const returnBookByISBN = async (ISBN) => {
  const book = await findBookByISBN(ISBN);

  if (!book) {
    return null; // Book does not exist
  }

  const updatedCopies = book.availableCopies + 1;
  const isAvailable = updatedCopies > 0;

  return await Book.findOneAndUpdate(
    { ISBN },
    {
      available: isAvailable,
      availableCopies: updatedCopies,
    },
    { new: true } // Return updated document
  );
};

const getAllAvailableBooks = async () => {
  return await Book.find({ available: true });
};

const getAllBooks = async () => {
  return await Book.find();
};

module.exports = {
  findBookByISBN,
  createBook,
  borrowBookByISBN,
  returnBookByISBN,
  getAllAvailableBooks,
  getAllBooks,
};
