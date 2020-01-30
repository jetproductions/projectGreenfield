/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

const QuestionSearch = ({ searchChangeHandler }) =>


// should add questions to global state and reducer with actions to
// get questions into store in component above this.
// will need to have a display and !display functionality so when
// search is in use only shows searched

  (
    <input type="search" onChange={(e) => searchChangeHandler(e)} placeholder="HAVE A QUESTION? SEARH FOR ANSWERS..." />
  );


export default QuestionSearch;
