/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import Answers from './Answers';

const Question = ({
  question: {
    question_id, question_body, asker_name, question_helpfulness, answers,
  },
}) => (
  <div>
    <h4>
Q:
      {' '}
      {question_body}
    </h4>
    <Answers questionId={question_id} {...answers} />
  </div>
);
export default Question;
