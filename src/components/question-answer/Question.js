/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import Answers from '../Answers/Answers';

const Question = ({
  question_id, question_body, asker_name, question_helpfulness, answers, answerModal,
}) => (
  <div>
    <h4>
Q:
      {' '}
      {question_body}
    </h4>
    {/* {answers ? <Answers questionId={question_id ? question_id : null} {...answers} /> : null} */}
  </div>
);
export default Question;
