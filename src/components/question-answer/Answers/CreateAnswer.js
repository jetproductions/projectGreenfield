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
  }

  formChangeHandler = (location, value) => {
    const payload = {};
    payload[location] = value;
    this.setState(payload);
  }

  emailValidator = () => {
    const { email } = this.state;
    if (email === '') {
      return null;
    }
    if (email.indexOf('@') === -1 || (email.length < 8 || email.length > 60)) {
      return (<span>Please enter a valid email</span>);
    }
    return null;
  }

  nameValidator = () => {
    const { name } = this.state;
    if (name === '') return null;
    if (name.length < 8 || name.length > 60) {
      return (<span>Please enter a valid username</span>);
    }
    return null;
  }

  bodyValidator = () => {
    const { body } = this.state;
    if (body === '') return null;
    if (body.length > 1000) {
      return (<span>Please make your question more concise</span>);
    }
    return null;
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
    if (created.status === 201) {
      this.setState({ success: true });
    }
    this.setState({ error: true });
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
          {' '}
          {this.bodyValidator()}
          {' '}
          <input
            id="body"
            type="text"
            name="body"
            onChange={(e) => this.formChangeHandler('body', e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 overflow-y-auto"
            rows="4"
            placeholder="Your Answer Here"
          />

        </label>
        <label htmlFor="answer-nickname">
Nickname:
          {' '}
          {this.nameValidator()}
          {' '}
          <input
            id="answer-nickname"
            type="text"
            onChange={(e) => this.formChangeHandler('name', e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="Example: jack543!"
            maxLength="60"
          />
          <span>For privacy reasons, do not use your full name or email address</span>
        </label>
        <br />
        <label htmlFor="answer-email">
Email:
          {' '}
          {this.emailValidator()}
          {' '}
          <input
            id="answer-email"
            type="email"
            name="answer-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="Example: jack@email.com"
            maxLength="60"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </label>
        <label htmlFor="answer-photos">
          Add Photos:
          <input
            id="answer-photos"
            type="url"
            onChange={(e) => { this.formChangeHandler('photos', e.target.value); }}
            placeholder="Put Link to Photos Here"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
