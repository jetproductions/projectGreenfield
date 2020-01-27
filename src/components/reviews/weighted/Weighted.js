import React from 'react';
import { connect } from 'react-redux';

const Weighted = ({ weighted }) => (
  <div>
    <h1 className="font-extrabold text-6xl">{ weighted || 0 }</h1>
  </div>
);

const mapStateToProps = (state) => ({
  weighted: state.weighted,
});

export default connect(mapStateToProps)(Weighted);
