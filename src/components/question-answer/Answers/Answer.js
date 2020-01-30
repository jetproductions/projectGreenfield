/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';

const markHelpful = (yesNo) => fetch(`http://3.134.102.30/qa/${questionId}/answers`, 'POST', { yesNo }).then((res) => res.json());
const Answer = ({
  answerer_name, body, helpfulness, date, photos,
}) => {
  const dateString = moment(date).format('MMMM Do, YYYY');
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
          {`| Helpful? Yes ${helpfulness} | Report`}
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
