import React, { Component } from 'react';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const Carousel = (props) => {
  const { currentSlideDeck } = props;
  const { currentImageChangeHandler } = props;

  const { selectedImage } = props;

  const fullSlideDeck = currentSlideDeck.map((item, index) => (
    <div className="flex mx-2 my-2 border border-gray-600 z-10 ">
      <img className="h-20 w-20  object-cover " key={Math.random() * Math.random() * 10} src={item} alt={`thumbnail ${index} for style`} onClick={(e) => { e.preventDefault(); currentImageChangeHandler(index); }} />
    </div>
  ));
  const sevenSlideDeck = fullSlideDeck.length > 7 ? fullSlideDeck.slice(selectedImage, selectedImage + 7) : fullSlideDeck;
  const htmlList = sevenSlideDeck;
  return (
    <div className="absolute mt-12 object-left z-10 h-screen">
      {htmlList}
    </div>
  );
};
export default Carousel;
