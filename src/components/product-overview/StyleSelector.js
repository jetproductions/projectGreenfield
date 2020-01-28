import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */

//  #### GUIDELINES ####
//         * Style Selector - Functional Component
//           * Style Display Component
//             > Makes rows of 4 and renders as:
//             * Style Display Item Component / Mapped div variable (both will work)

//           > Shows thumbnail of all styles in props.ItemStyles (passed from Main View)
//           > Thumbnails are in rows of 4
//           > Defaults to FIRST style (c
//               > Can be done in Main View's constructor by defaulting ItemStyles to first
//           > Clicking on a style changes the style in Main View's state -
//             > via function passed from Main View
//           > A check appears on top of a thumbnail to show it is selected
//             > Use a transparency perhaps?
//             > The selected style is inert - clicking on it does nothing.

const StyleSelector = (props) => (
  <div id="styleSelector">Style Selector</div>
);

export default StyleSelector;
