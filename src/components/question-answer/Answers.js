/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Answer from './Answer';

const Answers = ({ answers }) => (
  <div>
    {Object.values(answers).map((answer) => <Answer {...answer} />)}
  </div>
);

export default Answers;
