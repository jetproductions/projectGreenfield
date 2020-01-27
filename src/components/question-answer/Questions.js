/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Question from './Question';

const Questions = ({ questions }) => {
  // console.log('questions: ', questions.results);
  if (questions.product_id === undefined) {
    return (
      <div>No Questions Asked Yet</div>
    );
  }
  return questions.results.map((question) => {
    const { question_id } = question;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Question key={question_id} {...question} />
    );
  });
};

export default Questions;
