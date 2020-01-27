import React from 'react';

const Button = ({ name, submitHandler }) => {
  return (
    <button type="submit" onClick={(e) => submitHandler(e)}>{ name }</button>
  );
};

export default Button;
