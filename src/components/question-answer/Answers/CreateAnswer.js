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

  submitAnswer = () => {
    const { answer } = this.state;
    const { nickname } = this.state;
    const { email } = this.state;
    const { photos } = this.state;
    if (answer.length < 50 || answer.length > 1000) {
      return 'Inavlid Answer';
    }
    // long run would validate with user credentials to make sure not actual name
    if (nickname.length < 8 || nickname.length > 60) {
      return 'Invalid Nickname';
    }
    if ((email.length < 8 || email.length > 60) || email.indexOf('@') === -1) {
      return 'Invalid email';
    }
    // get fetch call to go and then change form display to show submitted after
    // fetch();
    return 'valid answer';
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
          <input
            id="answer-nickname"
            type="text"
            onChange={(e) => this.formChangeHandler('nickname', e.target.value)}
            placeholder="Example: jack543!"
            maxLength="60"
          />
        </label>
        <label htmlFor="answer-email">
Email:
          <input
            id="answer-email"
            type="email"
            name="answer-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="Example: jack@email.com"
            maxLength="60"
          />
        </label>
        <label htmlFor="answer-photos">
          Add Photos:
          <input
            id="answer-photos"
            type="url"
            onChange={(e) => { this.formChangeHandler('photos', e.target.value); }}
            placeholder="Put Link to Photos Here"
          />
        </label>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); this.submitAnswer(); }}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Answer
        </button>
      </div>
    );
  }

  // after submit could put timeer on submitted then close modal
}

export default CreateAnswer;
