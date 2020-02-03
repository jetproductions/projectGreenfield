/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState } from 'react';

import Question from './Question';
import QuestionModal from './QuestionModal';

// TODO: change questions modal show/hide to live here in state not in QA
// TODO: refactor multiple JSX returns to streamline
// TODO: refactor sort to be used by Qs and As
// TODO: when searching highlights text that is contained in search

const sortHelpfulness = (questionsArr) => questionsArr.sort((a, b) => {
  if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 1;
});

const searchQuestions = (searched, questions) => questions.filter((question) => {
  if (question.question_body.indexOf(searched) > -1) {
    return true;
  }
  return false;
});


const Questions = ({
  questions, questionModal, searchBar,
}) => {
  // should refactor the multiple return statements to streamline
  // can refactor search and sort into 1 function
  const [createQuestion, createQuestionView] = useState(false);
  const [showMore, showMoreToggle] = useState(false);
  if (createQuestion) {
    return (
      <div>
        <QuestionModal show={createQuestion} toggleModal={createQuestionView} addQuestionHandler={null} />
      </div>
    );
  }
  const searched = searchQuestions(searchBar, questions);
  // eslint-disable-next-line no-undef
  const sorted = sortHelpfulness(searched);
  if ((sorted.length > 0 && sorted.length <= 2) || showMore) {
    return (
      <div>
        {sorted.map((question) => {
          const qid = question.question_id ? question.question_id : null;
          return (
          // eslint-disable-next-line react/jsx-props-no-spreading
            <Question key={qid} {...question} {...questionModal} />
          );
        })}
        {sorted.length > 2 ? (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); showMoreToggle(!showMore); }}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
Show Less
          </button>
        ) : null}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); createQuestionView(!createQuestion); }}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Question +
        </button>
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <>
        <div>No Questions Asked Yet</div>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); createQuestionView(!createQuestion); }}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
        Add Question +
        </button>
      </>
    );
  }
  return (
    <div>
      {sorted.slice(0, 2).map((question) => {
        const qid = question.question_id ? question.question_id : null;
        return (
        // eslint-disable-next-line react/jsx-props-no-spreading
          <Question key={qid} {...question} {...questionModal} />
        );
      })}
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); showMoreToggle(!showMore); }}
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Show More
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); createQuestionView(!createQuestion); }}
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Question +
      </button>
    </div>
  );
};


export default Questions;
