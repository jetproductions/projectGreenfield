import React, { Component } from 'react';
import StarRatings from '../utility/stars/StarRatings';


/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */

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
  const { product: { default_price } } = props;
  return (
    <div id="productInformation">
      <div id="starRating" className="mx-4 my-8 content-center flex flex-wrap self-center ">
        <div className="self-center">
          <StarRatings rating={reviewScore} size="24" />
        </div>


        <button id="reviewNavButton" type="button" className="text-lg mx-2 my-2 cursor-pointer" aria-label="Main" role="link" onClick={(e) => { e.preventDefault(); return document.getElementById('reviews').scrollIntoView(true, { behavior: 'smooth' }); }}>Read All Reviews</button>

      </div>

      <h1 className="h1 mx-2 my-2 text-xl" id="category">{` CATEGORY >  ${category.toUpperCase()}`}</h1>
      <h1 className="h1 mx-2 my-2 text-5xl" id="productName">
        {name}
      </h1>
      <h1 className="italic h1 mx-8 my-2 text-xl" id="price">
        $
        {default_price}
      </h1>
    </div>
  );
};

export default ProductInformation;
