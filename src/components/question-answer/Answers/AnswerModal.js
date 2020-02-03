/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CreateAnswer from './CreateAnswer';

// TODO: refactor so only 1 modal for Q and A

const AnswerModal = ({ show, toggleModal, question_id }) => {
  const style = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: (show ? 'flex' : 'none'),
  };
  return (
    <div className="fixed justify-center items-center inset-0 z-50 py-8 max-h-screen" style={style}>
      <div className="py-10 bg-white relative w-full lg:max-w-5xl h-full">
        <a
          onClick={(e) => {
            e.preventDefault();
            toggleModal(false);
          }}
          href="/"
          className="absolute top-0 right-0 -mt-5 -mr-5 text-white bg-gray-800 rounded-full w-8 h-8 cursor-pointer"
        >
          <small className="absolute font-bold text-2xl w-full text-center" style={{ marginTop: '-3px', marginLeft: '2px', transform: 'rotate(45deg)' }}>+</small>
        </a>
        <div className="w-full max-h-full overflow-y-scroll overflow-x-hiddena px-10">
          <CreateAnswer toggleModal={toggleModal} question_id={question_id} />
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
