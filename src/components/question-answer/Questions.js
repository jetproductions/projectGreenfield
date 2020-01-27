/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Question from './Question';

const Questions = ({ questions }) => {
  console.log('questions: ', questions);
  if (questions.length === 0) {
    return (
      <div>No Questions Asked Yet</div>
    );
  }
  return questions.map((question) => {
    const id = question.question_id ? question.question_id : null;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Question key={id} {...question} />
    );
  });
};

export default Questions;
