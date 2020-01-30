/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, Component } from 'react';
import Answer from './Answer';
import Button from '../../utility/Button';

class Answers extends Component {
  constructor(props) {
    super(props);
    const { question_id } = this.props;
    this.state = {
      answers: [],
      question_id,
      count: 0,
    };
    this.getAnswers();
  }

  // this only gets two answers need to figure out how to get the rest of the answers
  // eslint-disable-next-line no-undef
  getAnswers = () => {
    const { question_id } = this.state;
    // console.log(question_id);
    fetch(`http://3.134.102.30/qa/${question_id}/answers`).then((res) => res.json())
      .then((result) => {
        // console.log('resultAnswers: ', result);
        this.setState({ answers: result.results, count: result.count });
      });
  }

  sortHelpfulness = (answersArr) => answersArr.sort((a, b) => {
    if (a.helpfulness > b.helpfulness) {
      return -1;
    }
    return 1;
  });

  render() {
    const { answers } = this.state;
    const filtered = this.sortHelpfulness(answers);
    // console.log('answers in render: ', answers);
    if (answers.length === 0) {
      return (
        <div>No Answers for This Question Yet</div>
      );
    }
    return (
      filtered.map((answer) => (
        <Answer key={answer.answer_id} {...answer} />
      ))
    );
  }
}

export default Answers;
