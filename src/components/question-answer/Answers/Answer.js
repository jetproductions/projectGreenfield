/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import moment from 'moment';

const helpfulUpdate = (e, id) => {
  console.log('answerid: ', id);
  e.preventDefault();
  // eslint-disable-next-line no-undef
  fetch(`http://3.134.102.30/qa/answer/${id}/helpful`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => { console.log(result); });
};

const Answer = ({
  answerer_name, body, helpfulness, date, photos, answer_id,
}) => {
  const dateString = moment(date).format('MMMM Do, YYYY');
  const [helpfulButton, buttonUsed] = useState(false);
  return (
    <div>
      <h2>
A:
        {' '}
        {body}
      </h2>
      <div className="flex items-center justify-end text-gray-700">
        <small className="bg-gray-400 rounded-full mr-2 font-black h-auto" style={{ fontSize: '8px', padding: '2px 3.5px' }}>{String.fromCharCode(10003)}</small>
        <span>{`By ${answerer_name}, `}</span>
        <span className="ml-1">
          { dateString }
          {' '}
          {'| Helpful?'}
          <button type="button" disabled={helpfulButton} onClick={(e) => { buttonUsed(true); helpfulUpdate(e, answer_id); }}>Yes</button>
          {' '}
          {`${helpfulness} | Report`}
        </span>
      </div>
      {photos.length > 0 ? (
        <footer>
          <div>Photos:</div>
          <span>Photos Go Here</span>
        </footer>
      ) : null}

    </div>
  );
};

export default Answer;
