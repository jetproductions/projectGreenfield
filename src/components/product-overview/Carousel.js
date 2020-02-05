import React, { Component } from 'react';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const Carousel = (props) => {
  const { currentSlideDeck } = props;
  const { currentImageChangeHandler } = props;

  const { selectedImage } = props;
  const upArrowHtml = (
    <div key="upArrow" className="mx-2 my-2 border border-gray-600 ">
      <div className="h-20 w-20 text-4xl text-blue-400 text-bold text-center object-center">
        &#10506;
      </div>
    </div>
  );
  const downArrowHtml = (
    <div key="downArrow" className="mx-2 my-2 border border-gray-600 ">
      <div className="h-20 w-20 arrow text-4xl text-blue-400 text-bold text-center">
        &#10507;
      </div>
    </div>
  );

  const leftArrowHtml = (
    <div className=" z-20 ">
      <div className="h-20 w-20 arrow text-4xl text-blue-400 text-bold text-center">
        &#10502;
      </div>
    </div>
  );
  const rightArrowHtml = (
    <div className=" z-20">
      <div className="h-20 w-20 arrow text-4xl text-blue-400 text-bold text-center">
        &#10503;
      </div>
    </div>
  );

  const fullSlideDeck = currentSlideDeck.map((item, index) => {
    const border = index === selectedImage ? 'border-2 border-blue-400' : 'border border-gray-600';
    const keyNum = index;
    return (
      <div key={keyNum} className={` mx-2 my-2  ${border} z-10 `}>
        <img className="h-20 w-20  object-cover " src={item} alt={`thumbnail ${index} for style`} onClick={(e) => { e.preventDefault(); currentImageChangeHandler(index); }} />
      </div>
    );
  });

  const sevenSlideDeck = fullSlideDeck.length > 7 ? fullSlideDeck.slice(selectedImage, selectedImage + 7) : fullSlideDeck;
  const htmlList = sevenSlideDeck;
  const prettyHtml = (
    <div className="h-screen justify-center">
      {upArrowHtml}
      {htmlList}
      {downArrowHtml}
    </div>

  );

  return (
    <div className="absolute mt-12 object-left z-10 h-screen flex">
      {prettyHtml}
      <div className="flex self-center">
        {leftArrowHtml}
        {rightArrowHtml}
      </div>

    </div>
  );
};
export default Carousel;
