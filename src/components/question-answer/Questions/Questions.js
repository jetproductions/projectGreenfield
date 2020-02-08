/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState } from 'react';

import Question from './Question';
import QuestionModal from './QuestionModal';

// TODO: Become scrollable when questions rendered is longer than a screen
// searchBar and Button should be on screen but outside of scroll
// TODO: showMore immediately loads all and expands to max height if necessary load in infinite scroll

const sortHelpfulness = (questionsArr) => questionsArr.sort((a, b) => {
  if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 1;
});

const searchQuestions = (searched, questions) => {
  if (searched.length < 3) return questions;
  return questions.filter((question) => {
    if (question.question_body.toLowerCase().indexOf(searched) > -1) {
      return true;
    }
    return false;
  });
};


const Questions = ({
  questions, questionModal, searchBar, showMoreQuestions, showMoreQuestionsHandler, getMoreQuestionsHandler, moreQuestionsAvailable,
}) => {
  // should refactor the multiple return statements to streamline
  // can refactor search and sort into 1 function
  const [createQuestion, createQuestionView] = useState(false);
  if (createQuestion) {
    return (
      <div>
        <QuestionModal show={createQuestion} toggleModal={createQuestionView} addQuestionHandler={null} />
      </div>
    );
  }
  const searched = searchQuestions(searchBar, questions);
  const sorted = sortHelpfulness(searched);
  const addQuestion = (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); createQuestionView(!createQuestion); }}
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
    >
    Add Question +
    </button>
  );
  const showMoreQuestionsRender = (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); showMoreQuestionsHandler(true); getMoreQuestionsHandler(); }}
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded py-2 px-4 m-2"
    >
        See More Answered Questions
    </button>
  );
  const showLessQuestionsRender = (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); showMoreQuestionsHandler(false); }}
      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded py-2 px-4 m-2"
    >
Show Less
    </button>
  );
  if (showMoreQuestions) {
    return (
      <div>
        <div className=" overflow-y-scroll max-h-screen">
          {sorted.map((question) => {
            const qid = question.question_id ? question.question_id : null;
            return (
            // eslint-disable-next-line react/jsx-props-no-spreading
              <Question key={qid} {...question} {...questionModal} searched={searchBar} />
            );
          })}
        </div>
        {moreQuestionsAvailable ? showMoreQuestionsRender : null}
        {sorted.length > 2 ? showLessQuestionsRender : null}
        {addQuestion}
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <>
        <div>No Questions Asked Yet</div>
        {addQuestion}
      </>
    );
  }
  return (
    <>
      <div className="max-h-screen overflow-y-scroll">
        {sorted.slice(0, 2).map((question) => {
          const qid = question.question_id ? question.question_id : null;
          return (
          // eslint-disable-next-line react/jsx-props-no-spreading
            <Question key={qid} {...question} {...questionModal} searched={searchBar} />
          );
        })}
      </div>
      {showMoreQuestionsRender}
      {addQuestion}
    </>
  );
};

export default Questions;
