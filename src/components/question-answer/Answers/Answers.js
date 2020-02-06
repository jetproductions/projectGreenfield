/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, Component } from 'react';
import Answer from './Answer';

// TODO: format so at most takes up 1/2 screen
// TODO: how to get all the answers for a question, lazy load? as scrolling?

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

  // how to get this to call and load more when reach bottom of scroll once scrolling enabled
  getAnswers = () => {
    const { question_id } = this.state;
    const { answers } = this.state;
    const { showMore } = this.state;
    const { count } = this.state;
    // check to see if likely there are more answers to be gotten
    if (answers.length < count && showMore) return;
    fetch(`http://52.26.193.201:3000/qa/${question_id}/answers/?count=${count === 0 ? 5 : count * 2}`).then((res) => res.json())
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

  showMoreHandler = (update) => {
    this.setState({ showMore: update });
    this.getAnswers();
  }

  render() {
    const { answers } = this.state;
    const filtered = this.sortHelpfulness(answers);
    const { showMore } = this.state;
    const { count } = this.state;
    const loadMore = (
      <button
        type="button"
        className=" hover:underline text-grey py-0.5 px-2 rounded m-2 "
        onClick={(e) => { e.preventDefault(); this.showMoreHandler(true); }}
      >
LOAD MORE ANSWERS
        {' '}
      </button>
    );
    const collapseAnswers = (
      <button
        type="button"
        className=" over:underline text-grey py-0.5 px-2 rounded m-2"
        onClick={(e) => { e.preventDefault(); this.showMoreHandler(false); }}
      >
COLLAPSE ANSWERS
      </button>
    );
    if (answers.length === 0) {
      return (
        <div>Be the first to answer this question</div>
      );
    }
    if (filtered.length > 2 && !showMore) {
      return (
        <>
          <Answer key={filtered[0].answer_id} {...filtered[0]} />
          <Answer key={filtered[1].answer_id} {...filtered[1]} />
          {loadMore}
        </>
      );
    }
    return (
      <>
        {filtered.map((answer) => (
          <Answer key={answer.answer_id} {...answer} />
        ))}
        {filtered.length > 2 && answers.length === count ? loadMore : null }
        {filtered.length > 2 ? collapseAnswers : null}
      </>
    );
  }
}

export default Answers;
