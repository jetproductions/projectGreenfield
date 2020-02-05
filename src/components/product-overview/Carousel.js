import React, { Component } from 'react';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const Carousel = (props) => {
  const { currentSlideDeck } = props;
  const { currentImageChangeHandler } = props;

  const { selectedImage } = props;
  const upArrowHtml = (
    <div key="upArrow" className="mx-2 my-2 border border-gray-600 ">
      <div className="h-20 w-20 arrow text-5xl text-purple-400 text-bold text-center object-center">
        &#10506;
      </div>
    </div>
  );
  const downArrowHtml = (
    <div key="downArrow" className="mx-2 my-2 border border-gray-600 ">
      <div className="h-20 w-20 arrow text-5xl text-purple-400 text-bold text-center">
        &#10507;
      </div>
    </div>
  );

  const leftArrowHtml = selectedImage > 0 ? (
    <div className=" pointer-events-auto z-20 ml-2 mr-2">
      <div className="h-20 w-20 arrow text-6xl text-purple-400 text-bold text-center" onClick={() => { const nextImage = selectedImage - 1 >= 0 ? selectedImage - 1 : 0; currentImageChangeHandler(nextImage); }}>
        &#10502;
      </div>
    </div>
  ) : (<div />);
  const rightArrowHtml = selectedImage < currentSlideDeck.length - 1 ? (
    <div className="pointer-events-auto z-20 mr-2 mr-2">
      <div className="h-20 w-20 arrow text-6xl text-purple-400 text-bold text-center" onClick={() => { const nextImage = selectedImage + 1 > fullSlideDeck.length - 1 ? fullSlideDeck.length - 1 : selectedImage + 1; currentImageChangeHandler(nextImage); }}>
        &#10503;
      </div>
    </div>
  ) : (<div />);

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
    <div className="pointer-events-auto h-screen justify-center">
      {upArrowHtml}
      {htmlList}
      {downArrowHtml}
    </div>

  );

  return (
    <div className="pointer-events-none absolute mt-12 object-left z-10 h-screen flex w-full">
      {prettyHtml}
      <div className="pointer-events-none flex self-center w-full">
        {leftArrowHtml}
        <div className="pointer-events-none w-full" />
        {rightArrowHtml}
      </div>

    </div>
  );
};
export default Carousel;
