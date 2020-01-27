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

  render() {
    return (
      <input type="text" onChange={(e) => this.onChangeHandler(e)} placeholder="HAVE A QUESTION? SEARH FOR ANSWERS..." />
    );
  }
}

export default QuestionSearch;
