/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React from 'react';
import Answers from './Answers';

const Question = ({
  question_id, question_body, asker_name, question_helpfulness, answers,
}) =>
  // console.log(question_id);
  (
    <div>
      <h4>
Q:
        {' '}
        {question_body}
      </h4>
      <Answers questionId={question_id} userName={asker_name} helfulness={question_helpfulness} {...answers} />
    </div>
  );
export default Question;
