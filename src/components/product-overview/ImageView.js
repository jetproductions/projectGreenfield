import React, { Component } from 'react';
import Carousel from './Carousel';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-globals */


//  #### GUIDELINES ####
//      * Image View - Carousel(Gallery) - Functional Component
//         > Viewable in Two States (May need to use switcher in Main view to handle):
//           # Default View
//           # Expanded View
//         > Currently Selected Style determines photos (passed from Main View's state)
//         > Updates when style Changes (i.e. re-renders when Main View's state is changed)
//         > Allow customer to browse between and zoom in on the photos
//
//        * Image Viewer
//          * Default View
//            > Default image is main image
//            > Overlaid by 'list' of thumbnail images
//              > Could be own component, with BG image being the selected one (as per tutorial)
//               > Has up and down arrows to scroll
//               > Displays up to 7 images at a time, scrolling if more
//              > Should auto scroll if the image nav'd to by arrow is not on the visible list
//            > When switching styles, the INDEX of the image selected is maintained on galler update
//              > Will probably need to check to see if there are same number of images
//             > Clicking on thumbnail updates main image
//             > Thumbnail should be highlighted when selected
//            > Selected thumbnail is inert - clicking it will have no effect.
//            > Has left and right buttons if main image is not at either end of list
//              > last image has no right, first image has no left, for obvious reasons
//            > On hover over the image NOT over the thumbnails or arrows, magnifying glass cursor
//               > If user clicks while magnifying glass is displayed, go to expanded view
//                > Use handler passed from Main View

//          * Expanded View
//             > Overlays the rest of the item detail area (i.e. Covers RIGHT COLUMN)
//            > Has right and left arrows which function as above
//            > The magifying glass is now a + symbol
//            > Thumbnails no longer appear (hide this component, or switch render to mini-icons)
//              > Instead icons indicating each image appear.
//                > They are much smaller than the list thumbnails
//                > The current image's icon is emphasized/different
//            > If user clicks the expanded view, the image is zoomed in 250%
//              > This will obviously make it larger than the space provided
//            > WHEN IN ZOOMED VIEW MODE (see above)
//              > The shown portion of the image is relative to the mouse position on the screen
//                 > (i.e. on the gallery image display area)
//                 > Moving the mouse left pans left, etc.
//                > Moving the mouse up pans up, etc.
//                > Pans should be SMOOTH
//                > No arrow or thumbnail selection icons are displayed
//                 > The mouse cursor is a - symbol
//                   > CLICKING on the image returns to the Expanded View State


const ImageView = (props) => {
  const { productStyles } = props;
  const { currentStyle } = props;
  const { selectedImage } = props;
  const { selectedViewFormat } = props;
  const { currentImageChangeHandler } = props;
  const { imageViewFormatChangeHandler } = props;
  const { imageUrl } = props;
  const slidelist = productStyles.map((style) => style.photos);
  const currentSlideDeck = slidelist[currentStyle] ? slidelist[currentStyle].map((entry) => entry.thumbnail_url) : [];
  const viewModeHeight = selectedViewFormat === 'default' ? 'h-screen' : selectedViewFormat === 'zoomed' ? 'h-screen' : 'h-full';
  const nextViewFormat = selectedViewFormat === 'default' ? 'expanded' : selectedViewFormat === 'expanded' ? 'zoomed' : 'default';
  const mainImageName = selectedViewFormat === 'zoomed' ? 'zoomedImage' : 'mainImage';
  const { mousePositionChangeHandler } = props;
  const { xPos } = props;
  const { yPos } = props;
  const { renderedCarouselStartIndex } = props;
  const { carouselStartIndexHandler } = props;
  const imgDiv = document.getElementById(mainImageName);
  const leftCol = document.getElementById('leftColumn');
  const colHeight = leftCol ? leftCol.clientHeight : 0;
  const colWidth = leftCol ? leftCol.clientWidth : 0;
  const screenHeight = window.screen.availHeight;
  const imgDivY = imgDiv ? imgDiv.height : 0;
  const imgDivX = imgDiv ? imgDiv.width : 0;

  let imgHeight = 0;
  let imgWidth = 0;

  const getImageDimensions = (src) => {
    const newImg = new Image();
    newImg.onload = function () {
      imgHeight = newImg.height * 2.5;
      imgWidth = newImg.width * 2.5;
      // console.log(imgHeight, imgWidth);
    };
    newImg.src = src;
  };

  getImageDimensions(imageUrl);
  console.log((((imgDivY / 2) - yPos) / (imgDivY / 2)) * ((imgHeight - imgDivY)));

  const zoomMargins = {
    marginTop: isNaN((((imgDivY / 2) - yPos + 170) / (imgDivY / 2)) * (1 / 2 * (imgHeight - imgDivY))) ? 0 : 0 - (((imgDivY / 2) - yPos + 170) / (imgDivY / 2)) * (1 / 2 * (imgHeight - imgDivY)),
    marginLeft: isNaN((((imgDivX / 2) - xPos + 85) / (imgDivY / 2)) * (1 / 2 * (imgWidth - imgDivX))) ? 0 : 0 - (((imgDivX / 2) - xPos + 85) / (imgDivX / 2)) * (1 / 2 * (imgWidth - imgDivX)),
  };

  // zoom margin equation = marginY = (1/2 imgDivY-mouseY)/ (1/2imgY) * Y
  // (((0.5 * imgDivY) - yPos) / (0.5 * imgDivY)) * (imgDivY) * (1 / 2 * (imgHeight - imgDivY));


  // console.log(colHeight, colWidth * 0.75);

  const imgHtml = imageUrl === 'http://http.cat/204'
    ? (<img className=" ml-auto mr-auto static h-screen w-full z-0  my-3  object-scale-down cursor-pointer" src={imageUrl} alt="A model wearing a garment" />)
    : selectedViewFormat === 'zoomed'
      ? (
        <div className="h-screen w-3/4">
          <img style={zoomMargins} id={mainImageName} onMouseMove={mousePositionChangeHandler} className={`static ${viewModeHeight} w-full z-0  my-3  object-cover cursor-pointer`} src={imageUrl} alt="A model wearing a garment" onClick={(e) => { e.preventDefault(); imageViewFormatChangeHandler(nextViewFormat); }} />
          {' '}
        </div>
      )
      : (<img id={mainImageName} className={`ml-auto mr-auto static ${viewModeHeight} w-full z-0  my-3  object-cover cursor-pointer`} src={imageUrl} alt="A model wearing a garment" onClick={(e) => { e.preventDefault(); imageViewFormatChangeHandler(nextViewFormat); }} />
      );

  return (
    <div className="">
      <div className="flex flex-auto ml-auto mr-auto ">
        <Carousel carouselStartIndexHandler={carouselStartIndexHandler} selectedViewFormat={selectedViewFormat} renderedCarouselStartIndex={renderedCarouselStartIndex} currentSlideDeck={currentSlideDeck} currentImageChangeHandler={currentImageChangeHandler} selectedImage={selectedImage} />
        {imgHtml}
      </div>

    </div>
  );
};

export default ImageView;
