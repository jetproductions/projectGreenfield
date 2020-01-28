import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */

// #### GUIDELINES ####
//         * Add to Cart - Functional Component
//           # Size - dropdown
//             > Needs access to Style Selector's selected style
//             > Needs to know sizes available for that style, omit from dropdown those that aren't
//             > Consider using a passed function or variable from Main View to
//               > Could represent a matrix table of sizes for style

//           # Qty - dropdown
//             > Needs to know stock available per style/size
//             > Passed in props from Main View

//           # Add to Cart - button - conditional behavior - requires function passed from Main View
//             > Size MUST be selected to add to cart
//               > if not, opens size dropdown with message above it ("please select size")
//             > If there is NO STOCK for style/size combo, this button is HIDDEN
//               > for extra flair, add message "GET NOTIFIED WHEN BACK IN STOCK"
//                 > Possibly make dummy form/modal that takes email

const AddToCart = (props) => (
  <div id="addToCart">
    <button className="cursor-pointer" type="button" onClick={(e) => { e.preventDefault(); return alert('Add to cart clicked'); }}>Add To Cart</button>
  </div>
);

export default AddToCart;
