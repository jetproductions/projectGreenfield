import React, { Component } from 'react';
import Carousel from './Carousel';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */

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
  const imgHeight = selectedViewFormat === 'default' ? 'h-screen' : selectedViewFormat === 'zoomed' ? '' : 'h-full';
  const nextViewFormat = selectedViewFormat === 'default' ? 'expanded' : selectedViewFormat === 'expanded' ? 'zoomed' : 'default';
  const mainImageName = selectedViewFormat === 'zoomed' ? 'zoomedImage' : 'mainImage';


  const imgHtml = imageUrl === 'https://http.cat/204' ? (<img className=" ml-auto mr-auto static h-screen w-full z-0  my-3  object-scale-down cursor-pointer" src={imageUrl} alt="A model wearing a garment" />)
    : (<img id={mainImageName} className={`overflow-hidden ml-auto mr-auto static ${imgHeight} w-full z-0  my-3  object-cover cursor-pointer`} src={imageUrl} alt="A model wearing a garment" onClick={(e) => { e.preventDefault(); imageViewFormatChangeHandler(nextViewFormat); }} />
    );

  return (
    <div className="">
      <div className="flex flex-auto ml-auto mr-auto ">
        <Carousel currentSlideDeck={currentSlideDeck} currentImageChangeHandler={currentImageChangeHandler} selectedImage={selectedImage} />
        {imgHtml}
      </div>
    </div>
  );
};

export default ImageView;
