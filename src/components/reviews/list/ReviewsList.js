import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewsList = ({ reviews, openModal, update }) => (
  <div className="flex flex-col w-full">
    { reviews.map((review) => <ReviewItem update={update} review={review} openModal={openModal} key={review.review_id} />)}
  </div>
);

export default ReviewsList;
