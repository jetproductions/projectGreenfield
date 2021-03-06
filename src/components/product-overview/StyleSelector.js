import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

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
//             > The selected style is inert - clicking on it does not  hing.

const StyleSelector = (props) => {
  const { productStyles } = props;
  const { styleChangeHandler } = props;
  const { currentStyle } = props;
  const styleName = productStyles[currentStyle] ? productStyles[currentStyle].name : '';
  const styles = productStyles.map((style, index) => {
    const keyNum = index;
    return (
      <div key={keyNum} className="w-1/4 px-1 py-1 h-40">
        <img className="rounded-full object-cover ml-auto mr-auto h-24 w-24 bg-gray-200 cursor-pointer" src={style.photos[0].thumbnail_url} alt={style.name} onClick={(e) => { e.preventDefault(); styleChangeHandler(index); }} />
      </div>
    );
  });
  return (
    <div>
      <h1 className="h1 mx-2" id="styleSelector">
        {`STYLE > ${styleName}`}
      </h1>
      <h1 className="h1 mx-8" id="styleSelector">{'Choose A Style >'}</h1>
      <div className="flex flex-wrap">
        {styles}
      </div>
    </div>
  );
};

export default StyleSelector;
