/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Answer from './Answer';

// eslint-disable-next-line no-undef
const getAnswers = (questionId) => fetch(`http://3.134.102.30/qa/${questionId}/answers`).then((res) => res.json());
// eslint-disable-next-line max-len
const Answers = async ({ questionId, answers }) => {
  console.log('question_id: ', questionId);
  if (answers !== undefined) {
    // need to make API call for answers and then render after the call is made
    return Object.values(answers).map((answer) => <Answer id={answer.id} {...answer} />);
  }
  const render = await getAnswers(questionId).then((result) => Object.values(result).map((answer) => (<Answer id={answer_id} {...answer} />)));
  return render;
};

export default Answers;
