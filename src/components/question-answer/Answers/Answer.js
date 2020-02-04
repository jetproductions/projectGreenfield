/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import moment from 'moment';
import Photos from './Photos';
import Updater from '../HelpfulReportHandler';

// TODO: have Seller next to username if seller - hard time finding this on API docs

const Answer = ({
  answerer_name, body, helpfulness, date, photos, answer_id,
}) => {
  const dateString = moment(date).format('MMMM Do, YYYY');
  const [helpfulButton, buttonUsed] = useState(false);
  const [helpfulnessState, helpfulnessUpdate] = useState(helpfulness);
  const [reportState, reportStateUpdate] = useState(false);
  const helpfulnessHander = async (e) => {
    const updated = await Updater(e, answer_id, 'answer', 'helpful');
    if (updated) {
      helpfulnessUpdate(helpfulnessState + 1);
      buttonUsed(true);
    }
  };
  const reportHandler = async (event) => {
    const reported = await Updater(event, answer_id, 'answer', 'report');
    if (reported) {
      reportStateUpdate(true);
    }
  };
  return (
    <div>
      <h2>
        <div className="font-bold float-left">A: </div>
        {' '}
        {body}
      </h2>
      <div className=" flex items-center justify-start text-gray-700 text-sm ">
        {/* <small className=" bg-gray-400 rounded-full mr-2 font-black h-auto " style={{ fontSize: '8px', padding: '2px 3.5px' }}>{String.fromCharCode(10003)}</small> */}
        <span>{`by ${answerer_name}, ${dateString}`}</span>
        <span className="ml-1">
          {' '}
          {'| Helpful?'}
          <button
            type="button"
            disabled={helpfulButton}
            onClick={(e) => { helpfulnessHander(e); }}
            className="hover:underline"
          >
            Yes
          </button>
          {' '}
          {`${helpfulnessState} |`}
          <button
            type="button"
            disabled={reportState}
            onClick={(e) => { reportHandler(e); }}
            className="hover:underline"
          >
           Report
          </button>
        </span>
      </div>
      {/* photo functionality can be added later, work with James for carousel-esque styling */}
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
