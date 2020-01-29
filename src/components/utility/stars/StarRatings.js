import React from 'react';
import Star from './Star';

const StarRatings = ({ rating, size = 25 }) => {
  /* eslint-disable no-param-reassign */
  rating = rating || 0;
  const remainder = rating % 1;
  const whole = Math.floor(rating);
  const stars = [...Array(whole)].map((e) => 1);
  stars.push(remainder);

  return (
    <div className="flex">
      { stars.map((percent, i) => <Star percent={percent} size={size} key={Math.random()} />) }
    </div>
  );
};

export default StarRatings;
