import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* esling-disable no-alert */

const AddToCart = (props) => (
  <div id="addToCart">
    <button type="button" onClick={(e) => { e.preventDefault(); return alert('Add to cart clicked'); }}>Add To Cart</button>
  </div>
);

export default AddToCart;
