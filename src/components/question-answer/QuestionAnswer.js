import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Questions from './Questions';


const QuestionAnswer = () => (
  <div>
    <div className="w-full px-4">
      <h5 className="uppercase font-thin text-xl">QUESTIONS & ANSWERS</h5>
    </div>
    <div>
      <SearchBar />
      <Questions />
    </div>
  </div>
);

export default QuestionAnswer;
