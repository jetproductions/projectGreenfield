import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './reviews.css';

const Reviews = ({ product: { id } }) => {
  const [reviewsMeta, setReviewsMeta] = useState({});
  const [ratings, setRatings] = useState({});
  const [totalRatings, setTotalRatings] = useState(0);
  /* eslint-disable no-undef */
  fetch(`http://3.134.102.30/reviews/${id}/meta`)
    .then((res) => res.json())
    .then((results) => {
      setReviewsMeta(results);
    });

  useEffect(() => {
    const { ratings: allRatings = [] } = reviewsMeta;
    const total = Object.values(allRatings).reduce((acc, curr) => acc + curr, 0);
    setRatings(allRatings);
    setTotalRatings(total);
  }, ['reviewsMeta']);

  return (
    <div className="reviews py-12">
      <div className="container mx-auto px-4">
        <div className="flex w-full -mx-4">
          <div className="w-full md:w-1/3 px-4">
            <h5 className="uppercase font-thin text-lg">Ratings & Reviews</h5>
          </div>
          <div className="w-full md:w-2/3 px-4">
            { totalRatings }
          </div>
        </div>
      </div>
    </div>
  );
};

const mapPropsToState = (state) => ({
  product: state.product,
});

export default connect(mapPropsToState)(Reviews);
