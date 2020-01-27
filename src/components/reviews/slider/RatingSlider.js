import React from 'react';

const RatingSlider = ({ total, rating: [rating, value] }) => {
  const percent = (value / total) * 100;
  return (
    <div className="flex w-full items-center py-2">
      <div>
        <span className="underline">{ `${rating} stars` }</span>
      </div>
      <div className="flex-grow bg-gray-200 h-3 ml-3">
        <span style={{ width: `${percent}%` }} className="h-full block bg-gray-800" />
      </div>
    </div>
  );
};

export default RatingSlider;
