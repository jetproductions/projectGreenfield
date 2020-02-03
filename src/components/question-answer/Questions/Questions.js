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
  const [createQuestion, createQuestionView] = useState(false);
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
  if (questions.length > 0) {
    return (
      <div>
        {sortHelpfulness(searched).map((question) => {
          const qid = question.question_id ? question.question_id : null;
          return (
          // eslint-disable-next-line react/jsx-props-no-spreading
            <Question key={qid} {...question} {...questionModal} />
          );
        })}
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
};


export default Questions;
