import React, { useState, useEffect } from 'react';
import Question from './Question';

const Questions = ({ questions }) => questions.map((question) => {
  const { id } = question;
  return (
    <Question key={id} />
  );
});

export default Questions;
