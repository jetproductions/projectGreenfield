import React, { Component } from 'react';
import { connect } from 'react-redux';
import reviewsMetaData from '../../../sampleData/reviews/reviewMetaData';
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
    this.setState({ reviewsMeta });
  }

  getTotalRatings = (ratings) => Object.values(ratings).reduce((acc, value) => acc + value, 0)

  render() {
    const { reviewsMeta } = this.state;
    const { ratings } = reviewsMeta;
    const totalRatings = this.getTotalRatings(ratings);

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
  }
}

const mapPropsToState = (state) => ({
  product: state.product,
});

export default connect(mapPropsToState)(Reviews);
