/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import moment from 'moment';
import Photos from './Photos';

// could eventualy refactor these two functions into one that can handle both based on parameters/args
const helpfulUpdate = async (e, id) => {
  e.preventDefault();
  const status = await fetch(`http://3.134.102.30/qa/answer/${id}/helpful`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => result.status);
  return status === 204;
};
const reportUpdate = async (e, id) => {
  e.preventDefault();
  const status = await fetch(`http://52.26.193.201:3000/qa/answer/${id}/report`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => result.status);
  console.log('report: ', status);
  return status === 204;
};

const Answer = ({
  answerer_name, body, helpfulness, date, photos, answer_id,
}) => {
  const dateString = moment(date).format('MMMM Do, YYYY');
  const [helpfulButton, buttonUsed] = useState(false);
  const [helpfulnessState, helpfulnessUpdate] = useState(helpfulness);
  const [reportState, reportStateUpdate] = useState(false);
  // const [showModal, changeModal] = useState(false);
  const helpfulnessHander = async (e) => {
    const updated = await helpfulUpdate(e, answer_id);
    if (updated) {
      helpfulnessUpdate(helpfulnessState + 1);
      buttonUsed(true);
    }
  };
  const reportHandler = async (event) => {
    console.log('reportHandler');
    const reported = await reportUpdate(event, answer_id);
    if (reported) {
      reportStateUpdate(true);
    }
  };
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
          <button
            type="button"
            disabled={helpfulButton}
            onClick={(e) => { helpfulnessHander(e); }}
          >
            Yes
          </button>
          {' '}
          {`${helpfulnessState} |`}
          <button
            type="button"
            disabled={reportState}
            onClick={(e) => { reportHandler(e); }}
          >
           Report
          </button>
        </span>
      </div>
      {photos.length > 0 ? (
        <footer>
          <div>Photos:</div>
          <Photos photos={photos} />
        </footer>
      ) : null}

    </div>
  );
};

export default Answer;
