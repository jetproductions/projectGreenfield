/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Answer from './Answer';

// eslint-disable-next-line no-undef
const getAnswers = (questionId) => fetch(`http://3.134.102.30/qa/${questionId}/answers`).then((res) => res.json());
const sortHelpfulness = (questionsArr) => questionsArr.sort((a, b) => {
  if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 1;
});

const Answers = ({ question_id }) => {
  const [answers, setAnswers] = useState([]);
  const [questionId, setQuestionId] = useState('');

  if (question_id !== questionId) {
    getAnswers(question_id).then((result) => setAnswers(result.results));
    setQuestionId(question_id);
  }
  if (answers.length > 0) {
    console.log('answers.results ', answers.results);

    return sortHelpfulness(answers).map((answer) => {
      const aid = answer.answer_id ? answer.answer_id : null;
      return (
        <Answer key={aid} {...answer} />
      );
    });
  }
  return (<div />);
};

export default Answers;
