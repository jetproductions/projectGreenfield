/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  // should be refactored into the upper level function
  // eventually should probably put these in store to work more efficiently
  submitQuestion = async () => {
    // check to see if meets answer requirements
    const { body } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { product: { id } } = this.props;
    const { addQuestionHandler } = this.props;

    if (body.length < 25 || body.indexOf('?') === -1) {
      // how to change styling and add a required text above the input field when requirement not met?
      return 'Invalid Question';
    }
    // need to put disclaimer in form
    // would eventually check against user credentials and name
    if (name.length < 8 || name.length > 60) {
      return 'Invalid Nickname';
    }
    if (email.length > 60 || email.indexOf('@') === -1) {
      return 'Invalid Email';
    }
    const data = { body, email, name };
    // get fetch call to go and then change form display to show submitted after
    const created = await fetch(`http://52.26.193.201:3000/qa/${id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    // console.log('created: ', created.status);
    if (created.status === 201) {
      // addQuestionHandler(data);
      this.setState({ success: true });
    }
    this.setState({ error: true });
    // linter wanted a return at end of arrow function this is probably unnecessary
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(CreateQuestion);
