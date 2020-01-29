import React from 'react';

const Button = ({ name, submitHandler }) => (
<<<<<<< HEAD
  <button type="submit" onClick={(e) => submitHandler(e)}>{ name }</button>
=======
  <button
    onClick={(e) => submitHandler(e)}
    type="button"
    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
  >
    { name }
  </button>
>>>>>>> 54cf6b6ac2f2da12f390baa237990f3156692395
);

export default Button;
