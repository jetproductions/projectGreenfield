/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

const QuestionSearch = ({ searchChangeHandler }) => (
  <input className=" w-full relative h-7 m-3 p-2 border border-black rounded-lg" name="question-search" type="search" onChange={(e) => searchChangeHandler(e)} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
);


export default QuestionSearch;
