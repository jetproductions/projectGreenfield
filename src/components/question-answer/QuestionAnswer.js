/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import SearchBar from './SearchBar';
import Questions from './Questions';
import sampleQuestions from '../../../sampleData/qAndA/questions';

const getQuestions = (id) => fetch(`http://3.134.102.30/qa/${id}`).then((res) => res.json());

const QuestionAnswer = ({ productStore }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState({});
  // eslint-disable-next-line no-undef
  if (Number(id) !== Number(productStore.id) || questions.length === 0) {
    getQuestions(id).then((result) => {
      // update the questions in state
      setQuestions(result);
    });
  }
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
