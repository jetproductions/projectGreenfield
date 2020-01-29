/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Answer from './Answer';

// eslint-disable-next-line no-undef
const getAnswers = (questionId) => fetch(`http://3.134.102.30/qa/${questionId}/answers`).then((res) => res.json());

const Answers = ({ questionId }) => {
  console.log('question_id: ', questionId);
  const [answers, setAnswers] = useState([]);
  return (<div />);
};

export default Answers;
