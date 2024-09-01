import React, { useState, useContext } from 'react';
import { BookContext } from '../Context/BookContext';

const ReturnBook = () => {
  const { returnBook, books } = useContext(BookContext);
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    const foundBook = books.find(b => b.ISBN === isbn);
    if (foundBook) {
      setBook(foundBook);
      setMessage('');
    } else {
      setBook(null);
      setMessage('Book not found.');
    }
  };

  const handleReturnBook = () => {
    if (book) {
      console.log(book)
      returnBook(book.ISBN).then(updatedBook => {
        setMessage(`${updatedBook.title} has been successfully returned.`);
        setBook(updatedBook);
      });
    } else {
      setMessage('This book is already available in the library.');
    }
  };

  return (
    <div className='flex w-full items-center justify-center rounded=lg'>
  <div className='return-book-container flex items-center flex-col w-[25rem] bg-richblack-800 p-8 rounded-lg'>
      <h2 className='mb-4'>Return a Book by ISBN</h2>
      <div className='search-section'>
        <input
          type='text'
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          placeholder='Enter ISBN'
          className='input input-bordered'
        />
        <button onClick={handleSearch} className='btn btn-primary'>
          Search
        </button>
      </div>
      {book && (
        <div className='book-details'>
          <h3>{book.title}</h3>
          <p>By {book.author}</p>
          <p>Year of publish: {book.yearOfPublish}</p>
          <p>Copies available: {book.availableCopies}</p>
          <button
            onClick={handleReturnBook}
            className={`btn btn-primary ${!book.available ? 'disabled bg-richblack-700' : ''}`}
            disabled={!book.available}
          >
            Return Book
          </button>
        </div>
      )}
      {message && <p className='message'>{message}</p>}
    </div>
    </div>
  
  );
};

export default ReturnBook;
