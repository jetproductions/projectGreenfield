/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Answer from './Answer';

// eslint-disable-next-line no-undef
const getAnswers = (questionId) => fetch(`http://3.134.102.30/qa/${questionId}/answers`).then((res) => res.json());
// eslint-disable-next-line max-len
const Answers = ({ question_id, answers }) => {
  if (answers !== undefined) {
    // need to make API call for answers and then render after the call is made
    return Object.values(answers).map((answer) => <Answer id={answer.id} {...answer} />);
  }
  getAnswers(question_id).then((result) => Object.values(result).results.map((answer) => (<Answer id={answer.id} {...answer} />)));

  // console.log(answers);
  return (
    <div />
  );
};

export default Answers;
