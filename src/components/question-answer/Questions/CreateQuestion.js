/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: '',
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
        <h3>Ask a Question</h3>
        <br />
        <label htmlFor="asked-question">
Question:
          <input
            id="asked-question"
            type="text"
            onChange={(e) => this.formChangeHandler('question', e.target.value)}
            placeholder="Your Question Here"
          />

        </label>
        <label htmlFor="question-nickname">
Nickname:
          <input id="question-nickname" type="text" onChange={(e) => this.formChangeHandler('nickname', e.target.value)} placeholder="Nickname" />
        </label>
        <label htmlFor="question-email">
Email:
          <input
            id="question-email"
            type="email"
            name="question-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="example@example.com"
          />
        </label>
        <button type="button" onClick={(e) => { e.preventDefault(); this.submitQuestion(); }}>Submit Question</button>
      </div>
    );
  }

  // after submit could put timeer on submitted then close modal
}

export default CreateQuestion;
