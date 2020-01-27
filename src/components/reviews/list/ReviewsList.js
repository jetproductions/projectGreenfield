import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewsList = ({ reviews }) => (
  <div className="flex flex-col w-full">
    { reviews.map((review) => <ReviewItem review={review} key={review.review_id} />)}
  </div>
);

export default ReviewsList;
