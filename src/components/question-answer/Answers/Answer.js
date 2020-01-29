/* eslint-disable camelcase */
import React from 'react';

// should make utility in the long run with modular fetch request so that can be used in both Review and QA
const markHelpful = (yesNo) => fetch(`http://3.134.102.30/qa/${questionId}/answers`, 'POST', { yesNo }).then((res) => res.json());

const Answer = ({
  answerer_name, body, date, helpfulness, photos,
}) => (
  <div>{body}</div>
);

export default Answer;
