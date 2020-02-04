/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';

// TODO: get selected photo to modal to center

const Photos = ({ photos }) => {
  const [selectedPhoto, selectedPhotoHandler] = useState(null);
  if (selectedPhoto) {
    return (
      <div className="fixed justify-center items-center inset-0 z-50 py-8 max-h-screen">
        <div className="py-10 bg-white relative w-full lg:max-w-5xl h-full">
          <a
            onClick={(e) => {
              e.preventDefault();
              selectedPhotoHandler(null);
            }}
            href="/"
            className="absolute top-0 right-0 -mt-5 -mr-5 text-white bg-gray-800 rounded-full w-8 h-8 cursor-pointer"
          >
            <small className="absolute font-bold text-2xl w-full text-center" style={{ marginTop: '-3px', marginLeft: '2px', transform: 'rotate(45deg)' }}>+</small>
          </a>
          <img src={selectedPhoto} alt="selection from answer" className="center max-w-xl" />
        </div>
      </div>
    );
  }
  return photos.map((item, index) => {
    const keyNum = index;
    return (
      <div
        key={keyNum}
        className=" inline-block mx-2 my-2  border border-gray-600 z-10 "
      >
        <img
          className="h-20 w-20  object-cover "
          key={item.id}
          src={item.url}
          alt={`thumbnail ${index} for answer`}
          onClick={(e) => { e.preventDefault(); selectedPhotoHandler(e.target.src); }}
        />
      </div>
    );
  });
};

export default Photos;
