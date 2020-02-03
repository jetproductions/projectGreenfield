/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState } from 'react';

import Question from './Question';
import QuestionModal from './QuestionModal';

const sortHelpfulness = (questionsArr) => questionsArr.sort((a, b) => {
  if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 1;
});

const searchQuestions = (searched, questions) => questions.filter((question) => {
  // console.log(question);
  if (question.question_body.indexOf(searched) > -1) {
    return true;
  }
  return false;
});


// should change questions modal show/hide to live here in state not in QA
const Questions = ({
  questions, questionModal, searchBar, addQuestionHandler,
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
  // looking for any search params
  const searched = searchQuestions(searchBar, questions);
  // looking to see if product has changed or if startup and nothing in questions
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
        onClick={(e) => { e.preventDefault(); showMoreToggle(!showMore); console.log('showmore'); }}
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
