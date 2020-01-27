/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import SearchBar from './SearchBar';
import Questions from './Questions';
import sampleQuestions from '../../../sampleData/qAndA/questions';

const QuestionAnswer = ({ productStore }) => {
  const { product } = useParams();
  const [questions, setQuestions] = useState(productStore);
  // eslint-disable-next-line no-undef
  useEffect(() => {});

  // how to get questions based on the id that gets pulled down from global state
  const getQuestions = () => {
    fetch(`http://3.134.102.30/qa/${product}`)
      .then((res) => res.json())
      .then((result) => {
        setQuestions(result);
      });
  };

  return (
    <div>
      <h3>
        QUESTIONS & ANSWER
      </h3>
      <SearchBar />
      <Questions questions={questions} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  productStore: state.product,
});

export default connect(mapStateToProps)(QuestionAnswer);
