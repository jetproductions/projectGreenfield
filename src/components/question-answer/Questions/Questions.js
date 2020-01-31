/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import Question from './Question';
import Modal from '../../utility/Modal';

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
const Questions = ({ questions, questionModal, searchBar }) => {
  if (questionModal) {
    return (
      <Modal />
    );
  }
  // looking for any search params
  const searched = searchQuestions(searchBar, questions);
  // looking to see if product has changed or if startup and nothing in questions
  // eslint-disable-next-line no-undef
  if (questions.length > 0) {
    return sortHelpfulness(searched).map((question) => {
      const qid = question.question_id ? question.question_id : null;
      return (
      // eslint-disable-next-line react/jsx-props-no-spreading
        <Question key={qid} {...question} {...questionModal} />
      );
    });
  }

  return (
    <div>No Questions Asked Yet</div>
  );
};


export default Questions;
