/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, Component } from 'react';
import Answer from './Answer';

// eslint-disable-next-line max-len
// const Answers = async ({ questionId, answers }) => {
//   const [answersList, setAnswers] = useState([]);
//   if (answers !== undefined) {
//     // need to make API call for answers and then render after the call is made
//     return Object.values(answers).map((answer) => <Answer id={answer.id} {...answer} />);
//   }
//   const foundAnswers = await getAnswers(questionId);
//   setAnswers(foundAnswers);
//   return (answersList.results.length === 0 || undefined ? null : answersList.map((answer) => (<Answer {...answer} />)));
// };
// console.log('result: ', result);
class Answers extends Component {
  constructor({ questionId }) {
    super({ questionId });
    this.state = {
      answers: [],
      questionId,
      count: 0,
    };
    this.getAnswers(questionId);
  }

  // this only gets two answers need to figure out how to get the rest of the answers
  // eslint-disable-next-line no-undef
  getAnswers = (questionId) => {
    fetch(`http://3.134.102.30/qa/${questionId}/answers`).then((res) => res.json())
      .then((result) => {
        console.log('resultAnswers: ', result);
        this.setState({ answers: result.results, count: result.count });
      });
  }


  render() {
    const { answers } = this.state;
    if (answers === []) {
      return (
        <div>No Answers for This Question Yet</div>
      );
    }
    return (
      answers.map((answer) => (
        <Answer key={answer.answer_id} {...answer} />
      ))
    );
  }
}

export default Answers;
