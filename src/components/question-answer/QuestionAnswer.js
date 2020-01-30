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
      questionModal: false,
      searched: '',
      filteredQuestions: [],
    };
    this.getQuestions(id);
  }

  // need to work on this get fucntioning better understanding needed
  // componentDidMount() {
  //   const { product: { id } } = this.props;
  //   this.getQuestions(id);
  // }

  // not sure this is setup properly
  componentDidUpdate(prevProps) {
	  const { product: { id } } = this.props;
	  // eslint-disable-next-line no-useless-return
	  if (id === prevProps.product.id) return;
    // need to get new questions
    this.getQuestions(id);
  }


  // need to update Search to handle this and to pass back up upon search
  // this might also need to handle filter for what questions get sent down?


  getQuestions = async (id) => {
    const fetchQuestions = await fetch(`http://3.134.102.30/qa/${id}`).then((res) => res.json());
    const { results } = fetchQuestions;
    this.setState({ questions: results });
  }

  searchChangeHandler = (event) => {
    console.log(event.target.value);
    this.setState({ searched: event.target.value });
  }

  render() {
	  const { questions } = this.state;
    const { questionModal } = this.state;
    const { searched } = this.state;
	  return (
  <div>
    <div className="w-full px-4">
      <h5 className="uppercase font-thin text-xl">QUESTIONS & ANSWERS</h5>
    </div>
    <div>
      <SearchBar searchChangeHandler={this.searchChangeHandler} />
      <Questions
        questions={questions}
        questionModal={questionModal}
        searchBar={searched}
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
