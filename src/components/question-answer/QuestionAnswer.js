/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import Questions from './Questions/Questions';

export class QuestionAnswer extends Component {
  constructor(props) {
    super(props);
    const { product: { id } } = props;
    this.state = {
      questions: [],
      searched: '',
      count: 0,
      showMoreQuestions: false,
    };
    this.getQuestions(id);
  }

  componentDidUpdate(prevProps) {
	  const { product: { id } } = this.props;
	  // eslint-disable-next-line no-useless-return
    if (id === prevProps.product.id) return;
    this.getQuestions(id);
  }

  getQuestions = async (id) => {
    const { count } = this.state;
    const fetchQuestions = await fetch(`http://52.26.193.201:3000/qa/${id}/?count=${count === 0 ? 5 : count + 2}`).then((res) => res.json());
    const { results } = fetchQuestions;
    this.setState({ questions: results, count: count + 2 });
  }

  searchChangeHandler = (event) => {
    this.setState({ searched: event.target.value });
  }

  getMoreQuestionsHandler = async () => {
    const { product: { id } } = this.props;
    this.getQuestions(id);
  }

  showMoreQuestionsHandler = (update) => {
    this.setState({ showMoreQuestions: update });
  }

  render() {
	  const { questions } = this.state;
    const { searched } = this.state;
    const { showMoreQuestions } = this.state;
    const { count } = this.state;
    return (
      <div id="questions-answers" className="container mx-auto w-auto p-3 justify-center align-center">
        <h5 className="uppercase font-thin text-xl float-left" id="questions-answers-title">QUESTIONS & ANSWERS</h5>
        <div className="w-auto">
          <SearchBar searchChangeHandler={this.searchChangeHandler} />
          <Questions
            questions={questions}
            searchBar={searched}
            className=" m-2 "
            getMoreQuestionsHandler={this.getMoreQuestionsHandler}
            showMoreQuestions={showMoreQuestions}
            showMoreQuestionsHandler={this.showMoreQuestionsHandler}
            moreQuestionsAvailable={!(questions.length < count)}
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
