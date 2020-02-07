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
        {/* <button className="my-1 rounded-sm bg-blue-600 h-6 w-20 " id="twitterButton">
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
        </button>
        <div className="">

          <iframe title="FB Button" className="mx-4 w-full" src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Flocalhost%3A8080%2Fproducts%2F1&width=35&layout=button&action=like&size=large&share=true&height=65&appId" width="35" height="65" scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media" />
        </div>
        <button className="w-20 h-6 rounded-sm bg-red-500">
          <img src="https://www.pinterest.com/pin/create/button/" />
          <script async defer src="//assets.pinterest.com/js/pinit.js" />
        </button> */}
        <img className="h-8 w-8 mr-2" alt="share on FaceBook" src="/assets/fbButton.png" />
        <img className="h-8 w-8 mx-2" alt="share on Instagram" src="/assets/instagramButton.png" />
        <img className="h-8 w-8 mx-2" alt="share on Pinterest" src="/assets/pinterestButton.png" />
        <img className="h-8 w-8 mx-2" alt="share on Twitter" src="/assets/twitterButton.png" />

      </div>
    </div>
  );
};

export default ProductDetails;
