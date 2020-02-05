/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Highlight from 'react-highlighter';

import Answers from '../Answers/Answers';
import AnswerModal from '../Answers/AnswerModal';
import Updater from '../HelpfulReportHandler';

const Question = ({
  question_id, question_body, question_helpfulness, searched,
}) => {
  const [helpfulButton, buttonUsed] = useState(false);
  const [helpfulnessState, helpfulnessUpdate] = useState(question_helpfulness);
  const [reportState, reportStateUpdate] = useState(false);
  const [createAnswer, createAnswerView] = useState(false);

  const helpfulnessHander = async (e) => {
    const updated = await Updater(e, question_id, 'question', 'helpful');
    if (updated) {
      helpfulnessUpdate(helpfulnessState + 1);
      buttonUsed(true);
    }
  };
  const reportHandler = async (event) => {
    const reported = await Updater(event, question_id, 'question', 'report');
    if (reported) {
      reportStateUpdate(true);
    }
  };
  if (createAnswer) {
    return (
      <AnswerModal show={createAnswer} toggleModal={createAnswerView} question_id={question_id} question_body={question_body} />
    );
  }
  const highlighted = <Highlight search={searched || ''} className="font-normal">{question_body}</Highlight>;
  const notHighlighted = <span className="font-normal">{question_body}</span>;
  return (
    <div className=" container mx-auto justify-center m-1">
      <div className=" text-lg items-left font-bold">
Q:
        {' '}
        {searched.length >= 3 ? highlighted : notHighlighted}
      </div>
      <div className=" text-sm items-right float-right ">
Helpful?
        <button className="text-md" type="button" disabled={helpfulButton} onClick={(e) => { helpfulnessHander(e); }}>Yes</button>
      (
        {helpfulnessState}
)
        {' '}
        {' '}
        <button
          type="button"
          disabled={reportState}
          onClick={(e) => { reportHandler(e); }}
          className=" hover:underline "
        >
          Report
        </button>
        {'  |  '}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); createAnswerView(true); }}
          className=" hover:underline text-black "
        >
          Add Answer
        </button>
      </div>
      {/* working to get to only take up certain amount of space with scrolling */}
      <Answers className=" h-screen w-overflow-y-scroll lg:h-20" question_id={question_id || null} />
    </div>
  );
};


export default Question;
