import React, { Component } from 'react';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */

//  #### GUIDELINES ####
//      * Image View - Carousel(Gallery) - Class Component
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


class ImageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productStyles: props.productStyles,
      currentStyle: props.currentStyle,
      selectedImage: props.selectedImage,
      selectedViewFormat: props.selectedViewFormat,
      currentImageChangeHandler: props.currentImageChangeHandler,
      imageViewFormatChangeHandler: props.imageViewFormatChangeHandler,
      url: undefined,
    };
    this.getUrl = this.getUrl.bind(this);
  }

  componentDidMount() {
    const { currentStyle } = this.state;
    const { selectedImage } = this.state;
    this.getUrl(currentStyle, selectedImage);
  }

  componentDidUpdate(prevProps) {
    const { product: { id } } = this.props;
    const { currentStyle } = this.state;
    const { selectedImage } = this.state;


    if (prevProps.currentStyle === currentStyle && prevProps.selectedImage === selectedImage) {
      return;
    }

    this.getUrl(currentStyle, selectedImage);
  }

  getUrl = (styleNum = 0, imageNum = 0) => {
    const { productStyles } = this.state;
    if (productStyles.length === 0) {
      return;
    }
    const newUrl = productStyles[styleNum].photos[imageNum].url;
    this.setState({ url: newUrl });
  }

  render() {
    const { productStyles } = this.state;
    const { currentStyle } = this.state;
    const { selectedImage } = this.state;
    const { selectedViewFormat } = this.state;
    const { currentImageChangeHandler } = this.state;
    const { imageViewFormatChangeHandler } = this.state;
    const { url } = this.state;


    const html = productStyles.length === 0 ? (
      <div id="imageView">
        <h3>Image View</h3>
      </div>
    ) : (
      <div id="imageView">
        <h3>Image View</h3>
        <div className="bg-auto" style={{ backgroundImage: url }} />
        {/* <img className="object-scale-down" src={bgString} alt="A model wearing a garment" /> */}
      </div>
    );


    return html;
  }
}

export default ImageView;
