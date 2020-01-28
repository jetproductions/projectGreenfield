/* eslint-disable camelcase */
import React from 'react';

const Answer = ({
  answerer_name, body, helpfulness, date,
}) => (
  <div>
    <h2>
A:
      {' '}
      {body}
    </h2>
    <span>
By
      {`${answerer_name}, `}
      {date}
    </span>
    <h6>Photos:</h6>
    <spa>Photos Go Here</spa>
  </div>
);

export default Answer;
// {
// 	"answer_id": 124960,
// 	"body": "we don't like it",
// 	"date": "2019-12-21T00:00:00.000Z",
// 	"answerer_name": "ewe",
// 	"helpfulness": 0,
// 	"photos": []
// },
