import React, { useContext, useEffect } from 'react'
import { BookContext } from '../../../Context/BookContext';

const BookCard = ({book}) => {
    const {borrowBook,books,setBooks,returnBook} = useContext(BookContext)
  
    const handleBorrowBook = () =>{
      if(book.available){
        borrowBook(book.ISBN);
      }
        // console.log(book.title + " has been borrowed");
    }
    const handleReturnBook = () => {
        returnBook(book.ISBN);
    }
  return (
    <div className='card bg-base-100 w-96 shadow-xl'>
      <figure className='px-10 pt-10'>
        <img
          src='https://img.freepik.com/free-photo/open-book-with-white-background_23-2148882765.jpg?size=626&ext=jpg'
          alt='Shoes'
          className='rounded-xl'
        />
      </figure>
      <div className='card-body items-center text-center'>
        <div className='flex items-center gap-1'>
        <h2 className='card-title'>{book.title}</h2>
        <p>By {book.author}</p>
        </div>
        <p className={`${book.available ? 'bg-caribbeangreen-300 ':'bg-yellow-800' } px-1 border rounded text-white`}>{book.available ? 'available':'Not available'}</p>
        <p>year of publish: {book.yearOfPublish}</p>
        <p>copies available: {book.availableCopies}</p>
        <div className='card-actions'>
          <button className={`${!book.available ? 'disabled bg-richblack-700': ''} btn btn-primary`} onClick={handleBorrowBook}>Borrow Now</button>
          <button className={` btn btn-primary`}onClick={handleReturnBook} >Return Now</button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
