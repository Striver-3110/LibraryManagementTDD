// src/context/BookContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a Context for managing book-related state
export const BookContext = createContext();

// Provider component for managing and providing book-related state to the rest of the application
export const BookProvider = ({ children }) => {
  const ROOT = 'http://localhost:5001/api/v1/Book'; // Base URL for API requests
  const [books, setBooks] = useState([]); // State to store the list of all books
  const [availableBooks, setAvailableBooks] = useState([]); // State to store the list of available books
  const [loading, setLoading] = useState(false); // State to manage loading status

  // Effect to fetch all books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${ROOT}/viewAllBooks`);
        setBooks(response.data.allBooks); // Update state with fetched books
      } catch (error) {
        console.error('Error fetching books:', error); // Log any errors encountered
      }
    };
    fetchBooks(); // Call the fetch function
  }, []);

  // Effect to fetch available books when the component mounts
  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const response = await axios.get(`${ROOT}/viewAvailableBooks`);
        console.log(response) // Log the response for debugging purposes
        setAvailableBooks(response.data.availableBooks); // Update state with fetched available books
      } catch (error) {
        console.error('Error fetching books:', error); // Log any errors encountered
      }
    };
    fetchAvailableBooks(); // Call the fetch function
  }, []);

  // Function to add a new book to the library
  const AddNewBook = async (book) => {
    try {
      const response = await axios.post(`${ROOT}/addNewBook`, {
        title: book.title,
        ISBN: book.ISBN,
        author: book.author,
        availableCopies: book.availableCopies,
        available: book.available,
        yearOfPublish: book.yearOfPublish,
      });
      console.log('Book added successfully:', response.data); // Log success message
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error('Error adding new book:', error.response?.data || error.message); // Log any errors encountered
      throw error; // Re-throw the error so it can be handled by the caller if needed
    }
  };

  // Function to borrow a book by ISBN
  const borrowBook = async (ISBN) => {
    try {
      // Prepare the request body
      const requestBody = { ISBN };
      
      // Send the request to borrow the book
      const response = await fetch(`${ROOT}/borrowBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Parse the JSON response
      const data = await response.json();
      console.log(data) // Log the response data for debugging purposes
      if (response.status) {
        // Update the state with the borrowed book
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.ISBN === ISBN ? data.updatedBook : book
          )
        );
        alert('Book borrowed successfully!'); // Notify the user of success
        console.log('Borrowed Book:', data.updatedBook); // Log the borrowed book details
      } else {
        alert(`Failed to borrow book: ${data.message}`); // Notify the user of failure
      }
      return data;
    } catch (error) {
      console.error('Error borrowing book:', error); // Log any errors encountered
      alert('Error occurred while borrowing the book.'); // Notify the user of an error
    }
  };

  // Function to return a borrowed book by ISBN
  const returnBook = async (ISBN) => {
    try {
      const requestBody = { ISBN };
  
      const response = await fetch(`${ROOT}/returnBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const updatedBook = data.updatedBook;
        // Update the state with the returned book
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.ISBN === ISBN ? updatedBook : book))
        );
        alert('Book returned successfully!'); // Notify the user of success
        return updatedBook;
      } else {
        alert(`Failed to return book: ${data.message}`); // Notify the user of failure
      }
    } catch (error) {
      console.error('Error returning book:', error); // Log any errors encountered
      alert('Error occurred while returning the book.'); // Notify the user of an error
    }
  };

  // Provide state and functions to the rest of the application through context
  return (
    <BookContext.Provider value={{ books, borrowBook, returnBook, loading, setLoading, availableBooks, AddNewBook }}>
      {children}
    </BookContext.Provider>
  );
};
