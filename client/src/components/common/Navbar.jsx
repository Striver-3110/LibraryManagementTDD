import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className='navbar bg-base-100 w-full flex items-center fixed z-50' role='navigation'>
        <div className='flex-1 max-w-maxContent'>
          <a className='btn btn-ghost text-xl'>LibraryManagement</a>
        </div>
        <div className='flex w-full font-bold justify-center'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/AddBook">Add Book</Link>
            </li>
            <li>
              <Link to="/ReturnBook">Return Book</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
