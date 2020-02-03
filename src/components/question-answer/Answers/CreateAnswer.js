/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';

class CreateAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      photos: [],
      error: false,
      success: false,
    };
    const { toggleModal } = props;
    const { question_id } = props;
  }

  formChangeHandler = (location, value) => {
    const payload = {};
    payload[location] = value;
    this.setState(payload);
  }

  submitAnswer = async () => {
    const { body } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { photos } = this.state;
    const { question_id } = this.props;
    if (body.length < 25 || body.length > 1000) {
      console.log('body length: ', body.length);
      return 'Inavlid Answer';
    }
    // long run would validate with user credentials to make sure not actual name
    if (name.length < 8 || name.length > 60) {
      return 'Invalid Nickname';
    }
    if ((email.length < 8 || email.length > 60) || email.indexOf('@') === -1) {
      return 'Invalid email';
    }
    const data = {
      body, email, name, photos,
    };

    // get fetch call to go and then change form display to show submitted after
    const created = await fetch(`http://52.26.193.201:3000/qa/${question_id}/answers`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    // console.log('created: ', created.status);
    if (created.status === 201) {
      // addAnswerHandler(data);
      this.setState({ success: true });
      // toggleModal(false);
    }
    this.setState({ error: true });
    // linter wanted a return at end of arrow function this is probably unnecessary
    return null;
  }

  render() {
    const { error } = this.state;
    const errorMessage = (
      <h5>There was an Error Submitting Your Answer Please Try Again</h5>
    );
    const { success } = this.state;
    const { toggleModal } = this.props;
    if (success) {
      setTimeout(() => { toggleModal(false); }, 1500);
      return (
        <h2>Your Answer has been successfully submitted.</h2>
      );
    }
    return (
      <div>
        Answer a Question
        <br />
        {error ? errorMessage : null}
        <label htmlFor="answer">
Your Answer:
          <input
            id="answer"
            type="text"
            onChange={(e) => this.formChangeHandler('body', e.target.value)}
            placeholder="Your Answer Here"
          />

        </label>
        <label htmlFor="answer-nickname">
Nickname:
          <input
            id="answer-nickname"
            type="text"
            onChange={(e) => this.formChangeHandler('name', e.target.value)}
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
