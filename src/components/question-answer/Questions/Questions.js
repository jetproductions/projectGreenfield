/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Question from './Question';

const getQuestions = (id) => fetch(`http://3.134.102.30/qa/${id}`).then((res) => res.json());
const sortHelpfulness = (questionsArr) => questionsArr.sort((a, b) => {
  if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 1;
});

const Questions = ({ productStore }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  // looking to see if product has changed or if startup and nothing in questions
  // eslint-disable-next-line no-undef
  if (Number(id) !== Number(productStore.id) || questions.length === 0) {
    getQuestions(id).then((result) => {
      // update the questions in state
      setQuestions(result.results);
    });
  }
  if (questions.length > 0) {
    return sortHelpfulness(questions).map((question) => {

      const qid = question.question_id ? question.question_id : null;
      return (
      // eslint-disable-next-line react/jsx-props-no-spreading
        <Question key={qid} {...question} />
      );
    });
  }

  return (
    <div>No Questions Asked Yet</div>
  );
};

const mapStateToProps = (state) => ({
  productStore: state.product,
});

export default connect(mapStateToProps)(Questions);
