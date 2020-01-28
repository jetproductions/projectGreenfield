import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Questions from './Questions/Questions';


const QuestionAnswer = () => (
  <div>
    <h3>
        QUESTIONS & ANSWER
    </h3>
    <SearchBar />
    <Questions />
  </div>
);

export default QuestionAnswer;
