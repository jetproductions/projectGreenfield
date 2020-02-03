/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// TODO: createQuestion renders with current product name
// TODO: input field bigger and scrollable vertically rather than moving horizontally when fills
// above should already be formatted, look at review form and check styling
// TODO: add error message when submission is incomplete telling which fields are inclomplete

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      success: false,
      error: false,
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

  submitQuestion = async () => {
    const { body } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { product: { id } } = this.props;

    if (body.length < 25 || body.indexOf('?') === -1) {
      return 'Invalid Question';
    }
    // would eventually check against user credentials and name
    if (name.length < 8 || name.length > 60) {
      return 'Invalid Nickname';
    }
    if (email.length > 60 || email.indexOf('@') === -1) {
      return 'Invalid Email';
    }
    const data = { body, email, name };
    const created = await fetch(`http://52.26.193.201:3000/qa/${id}`,
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
    const { success } = this.state;
    const { error } = this.state;
    const { toggleModal } = this.props;

    const errorMessage = (
      <h5>There was an Error Submitting Your Question Please Try Again</h5>
    );
    if (success) {
      setTimeout(() => { toggleModal(false); }, 1500);
      return (
        <h2>Your Question has been successfully submitted.</h2>
      );
    }
    return (
      <div>
        {/* need to have this render with current product name */}
        <h3>Ask a Question</h3>
        <br />
        { error ? errorMessage : null }
        <label htmlFor="body">

          {/* need to make this input field bigger, 1000 chars-ish */}
Question:
          {' '}
          {this.bodyValidator()}
          {' '}
          <input
            id="body"
            type="text"
            onChange={(e) => this.formChangeHandler('body', e.target.value)}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 overflow-y-auto"
            rows="4"
            placeholder="Your Question Here"
          />

        </label>
        <label htmlFor="question-nickname">
Nickname:
          {' '}
          {' '}
          {this.nameValidator()}
          {' '}
          <input
            id="question-nickname"
            type="text"
            onChange={(e) => this.formChangeHandler('name', e.target.value)}
            placeholder="Example: jackson11!"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            maxLength="60"
          />
          <span>For privacy reasons, do not use your full name or email address</span>
        </label>
        <br />
        <label htmlFor="question-email">
Email:
          {' '}
          {this.emailValidator()}
          {' '}
          <input
            id="question-email"
            type="email"
            name="question-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="Why did you like the product or not?"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            maxLength="60"
          />
          <span>For authentication reasons, you will not be emailed</span>
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
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(CreateQuestion);
