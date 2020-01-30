import React from 'react';

const RatingSlider = ({ total, rating: [rating, value], filter }) => {
  const percent = (value / total) * 100;
  return (
    <div className="flex w-full items-center py-2">
      <div>
        <a
          onClick={(e) => {
            e.preventDefault();
            filter(rating);
          }}
          href="/"
          className="underline"
        >
          { `${rating} stars` }
        </a>
      </div>
      <div className="flex-grow bg-gray-200 h-4 ml-3">
        <div style={{ width: `${percent}%` }} className="flex justify-end items-center h-full bg-teal-700">
          <span className="mr-2 text-xs text-white">
            { `${value}` }
          </span>
        </div>
      </div>
    </div>
  );
};

export default RatingSlider;
