import React, { Component } from 'react';
import StarRatings from '../utility/stars/StarRatings';


/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */

//  #### GUIDELINES ####
//    * Product information - Functional Component
//           > Category ( thru props from Main View state.item)
//           *  Stars/Review - Utility (Functional?) Component
//             > In this case, contains "[5 STARS WIDGET] (Read all __NUM__ Reviews)" on one line
//

const ProductInformation = (props) => {
  const { reviewScore } = props;
  const { product: { category } } = props;
  const { product: { name } } = props;
  return (
    <div id="productInformation">
      <h1 className="mx-2 my-2 text-xl" id="category">{` CATEGORY >  ${category.toUpperCase()}`}</h1>
      <h1 className="mx-2 my-2 text-3xl" id="productName">
        {name}
      </h1>
      <div className="mx-2 my-2">
        <StarRatings rating={reviewScore} size="18" />
      </div>

      <button id="reviewNavButton" type="button" className="mx-2 my-2 cursor-pointer" aria-label="Main" role="link" onClick={(e) => { e.preventDefault(); return document.getElementById('reviews').scrollIntoView(true, { behavior: 'smooth' }); }}>Read All Reviews</button>
    </div>
  );
};

export default ProductInformation;
