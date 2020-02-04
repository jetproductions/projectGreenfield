/* eslint-disable no-undef */
import React from 'react';

// TODO: make photos thumbnail size
// TODO: add photo display on click to bring into 'modal' style

const Photos = ({ photos }) => (photos.map((item, index) => {
  const keyNum = index;
  return (
    <div key={keyNum} className=" mx-2 my-2  border border-gray-600 z-10 ">
      <img
        className="h-20 w-20  object-cover "
        key={Math.random() * Math.random() * 10}
        src={item}
        alt={`thumbnail ${index} for answer`}
        // onClick={(e) => { e.preventDefault(); currentImageChangeHandler(index); }}
      />
    </div>
  );
}));

export default Photos;
