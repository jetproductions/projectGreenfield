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
    <div id="productDetails" className="">
      <h1 className="h1 font-semibold ml-32 my-6 mx-2 text-2xl">Product Details</h1>
      <h1 className="h1 my-6 ml-32 mx-6 text-base">{description}</h1>
      <div className="content-center flex ml-32 h-16" id="socialMediaButtons">

        <img className="socialMedia cursor-pointer h-8 w-8 mr-2 rounded-lg" alt="share on FaceBook" src="/assets/fbButton.png" />
        <img className="socialMedia cursor-pointer h-8 w-8 mr-2 rounded-lg" alt="share on Instagram" src="/assets/instagramButton.png" />
        <img className="socialMedia cursor-pointer h-8 w-8 mr-2 rounded-lg" alt="share on Pinterest" src="/assets/pinterestButton.png" />
        <img className="socialMedia cursor-pointer h-8 w-8 mr-2 rounded-lg" alt="share on Twitter" src="/assets/twitterButton.png" />

      </div>
    </div>
  );
};

export default ProductDetails;
