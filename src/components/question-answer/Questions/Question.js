/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import Answers from '../Answers/Answers';

const Question = ({
  question_id, question_body, asker_name, question_helpfulness,
}) => {
  console.log('question_body: ', question_body);
  return (
    <div>
      <h4>
Q:
        {' '}
        {question_body}
      </h4>
      <Answers questionId={question_id || null} />
    </div>
  );
};

export default Question;