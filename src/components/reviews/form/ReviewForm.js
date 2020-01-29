import React, { Component } from 'react';
import { connect } from 'react-redux';
import Star from '../../utility/stars/Star';

/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-array-index-key */
class ReviewForm extends Component {
  ratings = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  constructor(props) {
    super(props);
    const stars = [...new Array(5)].map((e) => 0);
    this.state = {
      form: {
        username: '',
        stars,
      },
    };
  }

  fillStars = (index) => {
    const { form, form: { stars } } = this.state;
    const next = index + 1;
    const filled = [...new Array(5)].map((e, i) => (i < next ? 1 : 0));
    this.setState({ form: { ...form, stars: filled } });
  }

  render = () => {
    const { product: { name } } = this.props;
    const { form: { stars } } = this.state;
    const ratingIndex = stars.lastIndexOf(1);
    return (
      <form className="w-full">
        <div className="flex flex-wrap -mx-4 mb-6">
          <div className="w-full px-4">
            <h1 className="text-2xl font-bold uppercase leading-normal">Write Your Review</h1>
            <h5 className="text-xl leading-none">
              About
              {` ${name}`}
            </h5>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-6">
          <div className="w-full items-center flex px-4">
            <div className="flex mr-6">
              {
              stars.map((percent, i) => (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    this.fillStars(i);
                  }}
                  key={i}
                  href="/"
                >
                  <Star size={30} percent={percent} />
                </a>
              ))
            }
            </div>
            <div className="text-xl">
              { this.ratings[ratingIndex] }
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(ReviewForm);
