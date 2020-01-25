import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import SearchBar from './SearchBar';
import Questions from './Questions';

const QuestionAnswer = ({ productStore }) => {
  const { product } = useParams();
  const [questions, setQuestions] = useState(productStore);
  // eslint-disable-next-line no-undef
  fetch(`http://3.134.102.30/qa/${product}`)
    .then((res) => res.json())
    .then((result) => {
      setQuestions(result);
    });
  return (
    <div>
      <h3>
        QUESTIONS & ANSWER
      </h3>
      <SearchBar />
      <Questions />
    </div>
  );
};

const mapStateToProps = (state) => ({
  productStore: state.product,
});

export default connect(mapStateToProps)(QuestionAnswer);
