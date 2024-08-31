import React from 'react'

const Navbar = () => {
  return (
    <>
      <div className='navbar bg-base-100 w-full flex items-center' role='navigation'>
        <div className='flex-1 max-w-maxContent'>
          <a className='btn btn-ghost text-xl'>LibraryManagement</a>
        </div>
        <div className='flex w-full font-bold justify-center'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a>All</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar
