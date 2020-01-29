import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint-disable react/no-unused-state */
class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
      },
    };
  }

  render = () => {
    const { product: { name } } = this.props;
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
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(ReviewForm);
