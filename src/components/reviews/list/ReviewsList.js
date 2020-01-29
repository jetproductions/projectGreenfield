import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewsList = ({ reviews, openModal }) => (
  <div className="flex flex-col w-full">
    { reviews.map((review) => <ReviewItem review={review} openModal={openModal} key={review.review_id} />)}
  </div>
);

export default ReviewsList;
