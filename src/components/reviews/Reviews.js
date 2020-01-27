import React, { Component } from 'react';
import { connect } from 'react-redux';
import reviewsMetaData from '../../../sampleData/reviews/reviewMetaData';
import Weighted from './weighted/Weighted';
import StarRatings from '../utility/stars/StarRatings';
import './reviews.css';

class Reviews extends Component {
  constructor(props) {
    super(props);
    const { product: { id } } = props;

    this.state = {
      reviewsMeta: reviewsMetaData,
    };
    this.getReviewsMeta(id);
  }

  componentDidUpdate() {
    const { product: { id } } = this.props;
    this.getReviewsMeta(id);
  }

  getReviewsMeta = async (id) => {
    /* eslint-disable no-undef */
    const reviewsMeta = await fetch(`http://3.134.102.30/reviews/${id}/meta`).then((res) => res.json());
    const { ratings } = reviewsMeta;
    this.setState({ reviewsMeta }, () => {
      this.setWeightedAverage(ratings);
    });
  }

  getTotalRatings = (ratings) => Object.values(ratings).reduce((acc, value) => acc + value, 0)

  setWeightedAverage = (ratings) => {
    const totalRatings = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);
    const weightedTotal = Object.keys(ratings).reduce((acc, key) => acc + (key * ratings[key]), 0);
    const average = (weightedTotal / totalRatings);
    // round to closets quarter
    const { setWeightedState } = this.props;
    setWeightedState(Math.round(average * 4) / 4);
  }

  render() {
    const { reviewsMeta } = this.state;
    const { ratings } = reviewsMeta;
    const totalRatings = this.getTotalRatings(ratings);

    return (
      <div className="reviews py-12">
        <div className="container mx-auto px-4">
          <div className="flex w-full -mx-4 mb-3">
            <div className="w-full px-4">
              <h5 className="uppercase font-thin text-lg">Ratings & Reviews</h5>
            </div>
          </div>
          <div className="flex w-full -mx-4">
            <div className="flex flex-col w-full md:w-1/3 px-4">
              <div className="w-full">
                <Weighted />
                <StarRatings />
              </div>
            </div>
            <div className="w-full md:w-2/3 px-4">
              <div className="font-bold text-lg">
                <span className="mr-2">{ totalRatings }</span>
                reviews, sorted by
                <u className="ml-1">relevance</u>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  product: state.product,
});

const mapDispatchToState = (dispatch) => ({
  setWeightedState: (total) => { dispatch({ type: 'SET_WEIGHTED_AVERAGE', payload: total }); },
});

export default connect(mapPropsToState, mapDispatchToState)(Reviews);
