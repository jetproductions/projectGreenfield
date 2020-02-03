/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, Component } from 'react';
import Answer from './Answer';
import AnswerModal from './AnswerModal';

class Answers extends Component {
  constructor(props) {
    super(props);
    const { question_id } = this.props;
    this.state = {
      answers: [],
      question_id,
      count: 0,
      // showModal: false,
    };
    this.getAnswers();
  }

  // this only gets two answers need to figure out how to get the rest of the answers
  // eslint-disable-next-line no-undef
  getAnswers = () => {
    const { question_id } = this.state;
    fetch(`http://52.26.193.201:3000/qa/${question_id}/answers`).then((res) => res.json())
      .then((result) => {
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
    if (answers.length === 0) {
      return (
        <div>No Answers for This Question Yet</div>
      );
    }
    // update to only show 2 answers at first
    // show more option
    // scroll window eventually with ~2 answers showing at any point
    return (
      filtered.map((answer, i) => {
        if (i < 2) {
          return (
            <Answer key={answer.answer_id} {...answer} />
          );
        }
        return null;
      })
    );
  }
}

export default Answers;
