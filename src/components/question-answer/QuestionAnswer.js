import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const QuestionAnswer = (props) => {
  const { id } = useParams();
  return (
    <div>
      QUESTIONS & ANSWERS
    </div>
  );
};

const mapStateToProps = (state) => ({
  productStore: state.product,
});

export default connect(mapStateToProps)(QuestionAnswer);
