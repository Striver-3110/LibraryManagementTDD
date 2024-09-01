import React, { useState } from 'react';

const Buttons = (props) => {
  const { books, availableBooks, setBook } = props;
  const [activeButton, setActiveButton] = useState('all');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    // Set the book list based on the button clicked
    buttonType === 'all' ? setBook(books) : setBook(availableBooks);
  };

  return (
    <div className='flex space-x-4 mb-4 items-start'>
      <button
        onClick={() => handleButtonClick('all')}
        className={`px-4 py-2 rounded-lg ${
          activeButton === 'all' ? 'bg-richblack-800 text-white border border-richblack-300' : 'bg-richblack-500 text-white border border-richblack-900'
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleButtonClick('available')}
        className={`px-4 py-2 rounded-lg ${
          activeButton === 'available' ? 'bg-richblack-800 text-white border border-richblack-300' : 'bg-richblack-500 text-white border border-richblack-900'
        }`}
      >
        Available
      </button>
    </div>
  );
};

export default Buttons;
