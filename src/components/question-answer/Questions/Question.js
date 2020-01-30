/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Answers from '../Answers/Answers';

const helpfulUpdate = (e, id) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  fetch(`http://3.134.102.30/qa/question/${id}/helpful`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => { console.log(result); });
};
const Question = ({
  question_id, question_body, asker_name, question_helpfulness,
}) => {
  const [helpfulButton, buttonUsed] = useState(false);
  return (
    <div>
      <h4>
Q:
        {' '}
        {question_body}
      </h4>
      <span>
Helpfulness?
        <button type="button" disabled={helpfulButton} onClick={(e) => { buttonUsed(true); helpfulUpdate(e, question_id); }}>Yes</button>
      (
        {question_helpfulness}
)
      </span>
      <Answers question_id={question_id || null} />

    </div>
  );
};


export default Question;
