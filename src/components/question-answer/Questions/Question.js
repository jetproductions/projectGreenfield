/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Answers from '../Answers/Answers';

const helpfulUpdate = async (e, id) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  const status = await fetch(`http://3.134.102.30/qa/question/${id}/helpful`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => result.status);
  return status === 204;
};
const Question = ({
  question_id, question_body, asker_name, question_helpfulness,
}) => {
  const [helpfulButton, buttonUsed] = useState(false);
  const [helpfulnessState, helpfulnessUpdate] = useState(question_helpfulness);
  const helpfulnessHander = async (e) => {
    const updated = await helpfulUpdate(e, question_id);
    if (updated) {
      helpfulnessUpdate(helpfulnessState + 1);
      buttonUsed(true);
    }
  };
  return (
    <div>
      <h4>
Q:
        {' '}
        {question_body}
      </h4>
      <span>
Helpfulness?
        <button type="button" disabled={helpfulButton} onClick={(e) => { helpfulnessHander(e); }}>Yes</button>
      (
        {helpfulnessState}
)
      </span>
      <Answers question_id={question_id || null} />

    </div>
  );
};


export default Question;
