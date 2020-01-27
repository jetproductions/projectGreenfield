/* eslint-disable camelcase */
import React, { Component } from 'react';
import Answers from './Answers';

const Question = ({
  question_id, question_body, asker_name, question_helpfulness, answers,
}) => {
  if (question_body !== undefined) {
    return (
      <div>
        <h4>{question_body}</h4>
      </div>
    );
  }
  return (
    <div />
  );
};
export default Question;
