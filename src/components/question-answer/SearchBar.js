/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

class QuestionSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  onChangeHandler = (e) => {
    this.setState({ search: e.target.value });
  }

  // should add questions to global state and reducer with actions to
  // get questions into store in component above this.
  // will need to have a display and !display functionality so when
  // search is in use only shows searched

  render() {
    return (
      <input type="text" onChange={(e) => this.onChangeHandler(e)} placeholder="HAVE A QUESTION? SEARH FOR ANSWERS..." />
    );
  }
}

export default QuestionSearch;
