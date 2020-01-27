import React from 'react';
import { connect } from 'react-redux';
import Star from './Star';

const StarRatings = ({ weighted, size = 25 }) => {
  /* eslint-disable no-param-reassign */
  weighted = weighted || 0;
  const remainder = weighted % 1;
  const whole = Math.floor(weighted);
  const stars = [...Array(whole)].map((e) => 1);
  stars.push(remainder);

  return (
    <div className="flex">
      { stars.map((percent, i) => <Star percent={percent} size={size} key={Math.random()} />) }
    </div>
  );
};

const mapStateToProps = (state) => ({
  weighted: state.weighted,
});

export default connect(mapStateToProps)(StarRatings);
