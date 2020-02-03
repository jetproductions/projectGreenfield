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
      showMore: false,
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

  showMoreHandler = () => {
    this.setState((prevState) => {
      const { showMore } = prevState;
      return { showMore: !showMore };
    });
  }

  render() {
    const { answers } = this.state;
    const filtered = this.sortHelpfulness(answers);
    const { showMore } = this.state;
    if (answers.length === 0) {
      return (
        <div>No Answers for This Question Yet</div>
      );
    }
    if (filtered.length > 2 && !showMore) {
      return (
        <>
          <Answer key={filtered[0].answer_id} {...filtered[0]} />
          <Answer key={filtered[1].answer_id} {...filtered[1]} />
          <button
            type="button"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => { e.preventDefault(); this.showMoreHandler(); }}
          >
            See More Answers
          </button>
        </>
      );
    }
    return (
      <>
        {filtered.map((answer) => (
          <Answer key={answer.answer_id} {...answer} />
        ))}
        {filtered.length > 2 ? (
          <button
            type="button"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => { e.preventDefault(); this.showMoreHandler(); }}
          >
        Collapse Answers
          </button>
        ) : null}
      </>
    );
    // how to fetch more answers as scroll
  }
}

export default Answers;
