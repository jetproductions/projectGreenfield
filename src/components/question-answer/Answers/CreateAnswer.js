/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';

class CreateAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      nickname: '',
      email: '',
      photos: [],
    };
    const { toggleModal } = props;
  }

  formChangeHandler = (location, value) => {
    this.setState({ location: value });
  }

  submitQuestion = () => {
    fetch();
  }

  render() {
    return (
      <div>
        Answer a Question
        <br />
        <label htmlFor="answer">
Your Answer:
          <input
            id="answer"
            type="text"
            onChange={(e) => this.formChangeHandler('answer', e.target.value)}
            placeholder="Your Answer Here"
          />

        </label>
        <label htmlFor="answer-nickname">
Nickname:
          <input id="answer-nickname" type="text" onChange={(e) => this.formChangeHandler('nickname', e.target.value)} placeholder="Nickname" />
        </label>
        <label htmlFor="answer-email">
Email:
          <input
            id="answer-email"
            type="email"
            name="answer-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="example@example.com"
          />
        </label>
        <label htmlFor="answer-photos">
          Add Photos:
          <input id="answer-photos" type="url" onChange={(e) => { this.formChangeHandler('photos', e.target.value); }} />
        </label>
        <button type="button" onClick={(e) => { e.preventDefault(); this.submitAnswer(); }}>Submit Answer</button>
      </div>
    );
  }

  // after submit could put timeer on submitted then close modal
}

export default CreateAnswer;
