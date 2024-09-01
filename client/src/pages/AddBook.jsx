import React, { useContext, useState } from 'react';
import { BookContext } from '../Context/BookContext';

const AddBook = () => {
  const [book, setNewBook] = useState({
    title: 'ABC Programming',
    ISBN: 'ISBN 12344567',
    author: 'James',
    availableCopies: 10,
    available: true,
    yearOfPublish: 2001,
  });
  const {AddNewBook} = useContext(BookContext)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.table(book)
    // Strip the "ISBN " prefix if it exists
    const formattedISBN = book.ISBN.trim();
  
    // Validation logic
    if (!book.title) {
      alert('Title is required.');
      return;
    }
  
    if (!formattedISBN || !/^ISBN \d{7,13}$/.test(formattedISBN)) {
      alert('ISBN must start with "ISBN " followed by 7 to 13 digits.');
      return;
    }
  
    if (!book.author) {
      alert('Author is required.');
      return;
    }
  
    // Ensure availableCopies is a positive number
    if (!book.availableCopies || isNaN(book.availableCopies) || book.availableCopies <= 0) {
      alert('Available copies is required and must be a positive number.');
      return;
    }
  
    // Ensure available is a boolean
    if (typeof book.available !== 'boolean') {
      alert('Availability must be selected.');
      return;
    }
  
    // Ensure yearOfPublish is a valid 4-digit year
    if (!book.yearOfPublish || isNaN(book.yearOfPublish) || book.yearOfPublish.toString().length !== 4) {
      alert('Year of publish is required and must be a valid 4-digit year.');
      return;
    }
  
    // Construct the request body
    const requestBody = {
      ISBN: formattedISBN,
      title: book.title,
      author: book.author,
      yearOfPublish: parseInt(book.yearOfPublish, 10),
      available: book.available,
      availableCopies: parseInt(book.availableCopies, 10),
    };
  
    // Log the request body for debugging
    console.log('Request Body:', requestBody);
  
    // Send the request
    AddNewBook(requestBody)
      .then((response) => {
        alert('Book added successfully!');
      })
      .catch((error) => {
        alert('Failed to add book. Please try again.');
        console.error('Error adding book:', error);
      });
  };
  
  
  return (
    <div className='max-w-md w-[30rem] m-auto bg-richblack-900 text-white flex items-center justify-center rounded-lg'>
 <form className="p-8 w-full flex flex-col bg-richblack-800 mx-auto rounded-lg" onSubmit={handleSubmit}>
    <div className='w-full flex items-center justify-center font-bold text-2xl'>Add Book</div>
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter book title"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="ISBN"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          ISBN
        </label>
        <input
          type="text"
          id="ISBN"
          name="ISBN"
          value={book.ISBN}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter ISBN"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="author"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter author name"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="availableCopies"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Copies Available
        </label>
        <input
          type="number"
          id="availableCopies"
          name="availableCopies"
          value={book.availableCopies}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter number of copies"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="yearOfPublish"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Year of Publish
        </label>
        <input
          type="number"
          id="yearOfPublish"
          name="yearOfPublish"
          value={book.yearOfPublish}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter year of publish"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="available"
            name="available"
            type="checkbox"
            checked={book.available}
            onChange={handleChange}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="available"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Available
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
    </div>
   
  );
};

export default AddBook;
