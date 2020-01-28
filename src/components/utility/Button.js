import React from 'react';

const Button = ({ name, submitHandler }) => (
  <button type="submit" onClick={(e) => submitHandler(e)}>{ name }</button>
);

export default Button;
