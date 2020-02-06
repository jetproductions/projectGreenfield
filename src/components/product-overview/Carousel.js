import React, { Component } from 'react';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */


const Carousel = (props) => {
  const { currentSlideDeck } = props;
  const { currentImageChangeHandler } = props;
  const { selectedImage } = props;
  const { carouselStartIndexHandler } = props;
  const { renderedCarouselStartIndex } = props;
  const { selectedViewFormat } = props;
  const correctSize = selectedViewFormat === 'default' ? 'h-20 w-20' : selectedViewFormat === 'expanded' ? 'h-10 w-10' : 'h-0 w-0';
  const fullSlideDeck = currentSlideDeck.map((item, index) => {
    const border = index === selectedImage ? 'border-2 border-blue-400' : 'border border-gray-600';
    const keyNum = index;
    return (
      <div key={keyNum} className={` mx-2 my-2  ${border} z-10 `}>
        <img className={`${correctSize}  object-cover `} src={item} alt={`thumbnail ${index} for style`} onClick={(e) => { e.preventDefault(); currentImageChangeHandler(index); }} />
      </div>
    );
  });

  const sevenSlideDeck = fullSlideDeck.length > 7 ? fullSlideDeck.slice(renderedCarouselStartIndex, renderedCarouselStartIndex + 7) : fullSlideDeck;
  const htmlList = sevenSlideDeck;

  const upArrowHtml = (
    <div key="upArrow" className="mx-2 my-2">
      <div className={`${correctSize} arrow text-5xl text-purple-400 text-bold text-center `} onClick={(e) => { e.preventDefault(); return carouselStartIndexHandler('up'); }}>
        &#10506;
      </div>
    </div>
  );
  const downArrowHtml = (
    <div key="downArrow" className="mx-2 my-2">
      <div className={`${correctSize} arrow text-5xl text-purple-400 text-bold text-center `} onClick={(e) => { e.preventDefault(); return carouselStartIndexHandler('down'); }}>
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


  const prettyHtml = selectedViewFormat !== 'zoomed' ? (
    <div className="pointer-events-auto h-screen justify-center">
      {renderedCarouselStartIndex === 0 ? (<div />) : upArrowHtml}
      {htmlList}
      {(renderedCarouselStartIndex + 7 >= fullSlideDeck.length - 1) ? (<div />) : downArrowHtml}
    </div>

  ) : (<div />);

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
