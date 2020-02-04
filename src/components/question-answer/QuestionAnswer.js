/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import Questions from './Questions/Questions';

class QuestionAnswer extends Component {
  constructor(props) {
    super(props);
    const { product: { id } } = props;
    this.state = {
      questions: [],
      searched: '',
      filteredQuestions: [],
    };
    this.getQuestions(id);
  }

  // not sure this is setup properly
  componentDidUpdate(prevProps) {
	  const { product: { id } } = this.props;
	  // eslint-disable-next-line no-useless-return
	  if (id === prevProps.product.id) return;
    this.getQuestions(id);
  }


  getQuestions = async (id) => {
    const fetchQuestions = await fetch(`http://52.26.193.201:3000/qa/${id}`).then((res) => res.json());
    const { results } = fetchQuestions;
    this.setState({ questions: results });
  }

  searchChangeHandler = (event) => {
    this.setState({ searched: event.target.value });
  }

  render() {
	  const { questions } = this.state;
    const { searched } = this.state;
	  return (
  <div id="questions-answers" className="container mx-auto w-auto max-w-5xl justify-center align-center">
    <div className="w-full px-4">
      <h5 className="uppercase font-thin text-xl">QUESTIONS & ANSWERS</h5>
    </div>
    <div className="w-auto">
      <SearchBar searchChangeHandler={this.searchChangeHandler} />
      <Questions
        questions={questions}
        searchBar={searched}
        className=" m-2 "
      />
    </div>
  </div>
	  );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});


export default connect(mapStateToProps)(QuestionAnswer);
