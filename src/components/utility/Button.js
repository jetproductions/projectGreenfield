import React from 'react';

const Button = ({ name, submitHandler }) => (
  <button
    onClick={(e) => submitHandler(e)}
    type="button"
    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded utility-button"
  >
    { name }
  </button>
);

export default Button;
