import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../components/core/HomePage/BookCard'
import { BookContext } from '../Context/BookContext'
import Buttons from '../components/common/Buttons'

const Home = () => {
  const ROOT = 'http://localhost:5001/api/v1/Book'

  const { books, availableBooks } = useContext(BookContext)
  const [book, setBook] = useState([])
  useEffect(()=>{
    setBook(books)
  },[books])
  console.log(availableBooks)
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className=' text-richblack-700 font-semibold mb-3 text-4xl flex items-end justify-center w-full'>
        Welcome To Library Management
      </div>
      <Buttons
        books={books}
        availableBooks={availableBooks}
        setBook={setBook}
      />

      <ul className='grid grid-cols-3 gap-4'>
        {book && book.map(book => <BookCard key={book.ISBN} book={book} />)}
      </ul>
    </div>
  )
}

export default Home
