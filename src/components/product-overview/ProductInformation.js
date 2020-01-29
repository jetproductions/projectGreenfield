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
  return (
    <div id="productInformation">
      <h3> Product Information</h3>
      <StarRatings rating={reviewScore} />

      {/* Rework this to nav to the ACTUAL Reviews component.  Coordinate with Troy to get an ID on it or a REF that can be scrolled to easily */}
      {/* Resolve issues with tag name... */}
      <button type="button" className="cursor-pointer" aria-label="Main" role="link" onClick={(e) => { e.preventDefault(); return document.getElementById('reviews').scrollIntoView(true, { behavior: 'smooth' }); }}>Read All Reviews</button>
    </div>
  );
};

export default ProductInformation;
