/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Answer from './Answer';

// eslint-disable-next-line max-len
const Answers = ({ answers }) => (
  Object.values(answers).map((answer) => <Answer id={answer.id} {...answer} />)
);

export default Answers;
