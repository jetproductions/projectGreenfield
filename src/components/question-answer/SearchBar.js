/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

const QuestionSearch = ({ searchChangeHandler }) => (
  <input name="question-search" type="search" onChange={(e) => searchChangeHandler(e)} placeholder="HAVE A QUESTION? SEARH FOR ANSWERS..." />
);


export default QuestionSearch;
