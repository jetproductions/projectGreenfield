import React from 'react';
import moment from 'moment';
import Star from '../../utility/stars/Star';

const Review = ({ review }) => {
  const { rating } = review;
  const { reviewer_name: reviewerName } = review;
  const { date } = review;
  const dateString = moment(date).format('MMMM Do, YYYY');
  const stars = [...Array(rating)].map((e) => 1);
  return (
    <div className="flex flex-col w-full mb-6 pb-6 border-b border-gray-500">
      <header className="flex items-center justify-between w-full text-xs mb-2">
        <div className="flex">
          { stars.map((percent, i) => <Star percent={1} size="10" key={Math.random()} />) }
        </div>
        <div className="text-gray-600">
          <span>{`${reviewerName},`}</span>
          <span className="ml-1">{ dateString }</span>
        </div>
      </header>
      { JSON.stringify(review) }
    </div>
  );
};

export default Review;
