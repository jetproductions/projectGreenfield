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
    // check to see if meets answer requirements
    const { question } = this.state;
    const { nickname } = this.state;
    const { email } = this.state;
    if ((question.length < 50 || question.length > 1000) || question.indexOf('?') === -1) {
      return 'Invalid Question';
    }
    // need to put disclaimer in form
    // would eventually check against user credentials and name
    if (nickname.length < 8 || nickname.length > 60) {
      return 'Invalid Nickname';
    }
    if (email.length > 60 || email.indexOf('@') === -1) {
      return 'Invalid Email';
    }
    // fetch();
    return 'valid';
  }

  render() {
    return (
      <div>
        {/* need to have this render with current product name */}
        <h3>Ask a Question</h3>
        <br />
        <label htmlFor="asked-question">
          {/* need to make this input field bigger, 1000 chars-ish */}
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
          <input
            id="question-nickname"
            type="text"
            onChange={(e) => this.formChangeHandler('nickname', e.target.value)}
            placeholder="Example: jackson11!"
            maxLength="60"
          />
        </label>
        <label htmlFor="question-email">
Email:
          <input
            id="question-email"
            type="email"
            name="question-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="Why did you like the product or not?"
            maxLength="60"
          />
        </label>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); this.submitQuestion(); }}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Question
        </button>
      </div>
    );
  }

  // after submit could put timeer on submitted then close modal
}

export default CreateQuestion;
