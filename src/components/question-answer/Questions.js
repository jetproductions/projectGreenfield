/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Question from './Question';

const Questions = ({ questions }) => {
  // console.log('questions: ', questions.results);
  if (questions.length === 0) {
    return (
      <div>No Questions Asked Yet</div>
    );
  }
  return questions.results.map((question) => {
    const { question_id } = question;
    return (
      <Question key={question_id} />
    );
  });
};

export default Questions;
