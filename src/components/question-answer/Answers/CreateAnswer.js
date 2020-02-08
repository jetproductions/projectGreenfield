/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Photos from './Photos';

// TODO: add error message when submission is incomplete telling which fields are inclomplete 'You must enter the following:'
// TODO: how to validate photos uploads?

// this export added for testing unlinked to redux store
export class CreateAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      photos: [],
      photo: '',
      photosToSend: [],
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
      return (<span className="answer-name-valid">Please enter a valid username</span>);
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

  photoAddHandler = (e) => {
    const { photos } = this.state;
    const { photo } = this.state;
    const { photosToSend } = this.state;
    if (photo.length === 0) return;
    const count = photos.length;
    photos.push({ url: photo, id: count + 1 });
    photosToSend.push(photo);
    this.setState({ photos, photo: '', photosToSend });
  }

  submitAnswer = async () => {
    const { body } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { question_id } = this.props;
    const { photosToSend } = this.state;

    if (body.length < 25 || body.length > 1000) {
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
      body, email, name, photos: photosToSend,
    };
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
    // eslint-disable-next-line react/destructuring-assignment
    const productName = this.props.product.name;
    // eslint-disable-next-line react/destructuring-assignment
    const questionBody = this.props.question_body;
    const { photos } = this.state;
    const { photo } = this.state;
    if (success) {
      setTimeout(() => { toggleModal(false); }, 1500);
      return (
        <div className="justify-center">Your Answer has been successfully submitted.</div>
      );
    }

    const addPhotoInput = (
      <div className="flex">
        <input
          id="answer-photos"
          type="url"
          onChange={(e) => { this.formChangeHandler('photo', e.target.value); }}
          placeholder="Put Link to Photos Here"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          value={photo}
        />
        <button type="button" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 flex justify-center px-2 rounded  mx-2 mb-2" onClick={(e) => { e.preventDefault(); this.photoAddHandler(e); }}>Add Photo</button>
      </div>
    );

    return (

      <div className=" w-full px-4 text-gray-700 create-answer">
        <h2 className=" text-xl ">Answer a Question about:</h2>
        {' '}
        <h5 className=" text-l ">{`${productName}: ${questionBody}`}</h5>
        <br />
        {error ? errorMessage : null}
        <form>
          <div className="flex flex-wrap -mx-4 mb-8">
            <label htmlFor="answer-nickname" className=" float-left ">
        *Nickname:
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
                value=""
              />
              <span className=" text-xs ">For privacy reasons, do not use your full name or email address</span>
            </label>
          </div>
          <div className="flex flex-wrap -mx-4 mb-8">
            <label htmlFor="answer-email" className="float-right">
*Email:
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
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 lg:max-w-6/12"
              />
              <span className=" text-xs ">For authentication reasons, you will not be emailed</span>
            </label>
          </div>
          <div className="flex flex-wrap -mx-4 mb-8">
            <label htmlFor="answer">
*Your Answer:
              {' '}
              {this.bodyValidator()}
              {' '}
              <input
                id="body"
                type="text"
                name="body"
                onChange={(e) => this.formChangeHandler('body', e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 inline"
                rows="4"
                placeholder="Your Answer Here"
              />
            </label>
          </div>
          <div className="flex flex-wrap -mx-4 mb-8">
            <label htmlFor="answer-photos">
          Add Photos:
              {photos.length !== 0 ? <Photos photos={photos} /> : null}
              {photos.length < 4 ? addPhotoInput : null}
            </label>
          </div>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); this.submitAnswer(); }}
            className=" bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex flex-wrap -mx-4 mb-4"
          >
          Submit Answer
          </button>
        </form>
        <footer>
          <div className=" text-grey font-size">
* Indicates Required Field
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(CreateAnswer);
