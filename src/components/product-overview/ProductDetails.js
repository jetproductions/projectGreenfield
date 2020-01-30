import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */

//  #### GUIDELINES ####
//         * Product Details - Functional Component
//            * Social Media Widget Component
//             > May be partially functional - depends on some Auth stuff, user, etc. (?)
//             > Allows user to share item on the following:
//               # FaceBook
//               # Twitter
//               # Pinterest

const ProductDetails = (props) => {
  const { product: { description } } = props;
  return (
    <div id="productDetails">
      <h1 className="font-semibold ml-24 my-6 mx-2 text-2xl">Product Details</h1>
      <h1 className="my-6 ml-32 mx-6 text-base">{description}</h1>
    </div>
  );
};

export default ProductDetails;
