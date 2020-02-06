import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddToCart from './AddToCart';
import ImageView from './ImageView';
import ProductDetails from './ProductDetails';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './ProductOverview.css';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable camelcase */


//        ## [Q] ##:  Could/Should the columns be different components themselves, or is this needless complication?
//        ## [A] ##:  Needlessly complicated, if state is used correctly

//        ## [Q] ##:  Should the image carousel be three, four, or five components?  Is there a clean way to do it with ONE?
//        ## [A] ##:

//        ## [Q] ##:
//        ## [A] ##:


// GUIDELINES:
// Product Main View - Class Component

//       > State contains the information relevant to all child components
//         > This is passed down through props
//       > State is passed Item from store
//         > Stores it in state

class ProductOverview extends Component {
  constructor(props) {
    super(props);
    const { product: { id } } = props;
    const { product: { default_price } } = props;
    this.state = {
      //         [product]: passed from PRODUCT OVERVIEW in props, from store
      //         [productStyles]: passed from API call method in constructor.
      //         [currentStyle]: defaults to FIRST style in list.  Changed by Style Selector component
      //         [SelectedSize]: defaults to "Select Size".  Changed by Add to Cart component
      //         [SelectedQty]: defaults to 1, max is 15.  Changed by Add to Cart component
      //         [selectedImage]; defaults to 0, i.e. first.  Changed by ImageView component
      //         [selectedViewFormat]: default, expanded or zoomed.   view slides out, over RIGHT COLUMN, zoom is responsive to mouse position 250% zoom
      productStyles: [],
      currentStyle: 0, // The first style doesn't necessarily have a value of 0.  Some items (such as 2) don't have pictures.
      selectedSize: '',
      selectedQty: 1,
      selectedImage: 0,
      selectedViewFormat: 'default',
      imageUrl: '',
      skus: [],
      maxQty: 0,
      xPos: 0,
      yPos: 0,
      renderedCarouselStartIndex: 0,
      defaultPrice: default_price,
      salePrice: 0,
    };

    this.getProductStyles(id);

    // Handler Binds
    this.styleChangeHandler = this.styleChangeHandler.bind(this);
    this.sizeChangeHandler = this.sizeChangeHandler.bind(this);
    this.qtyChangeHandler = this.qtyChangeHandler.bind(this);
    this.addToCartClickHandler = this.addToCartClickHandler.bind(this);
    this.currentImageChangeHandler = this.currentImageChangeHandler.bind(this);
    this.imageViewFormatChangeHandler = this.imageViewFormatChangeHandler.bind(this);
    this.imageUrlChangeHandler = this.imageUrlChangeHandler.bind(this);
    this.skuChangeHandler = this.skuChangeHandler.bind(this);
    this.mousePositionChangeHandler = this.mousePositionChangeHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { product: { id } } = this.props;

    if (id === prevProps.product.id) {
      return;
    }

    this.getProductStyles(id);
  }


  // API CALLS:
  //    > Product STYLES - store in state.productStyles
  getProductStyles(productId) {
    const { defaultPrice } = this.state;
    return fetch(`http://52.26.193.201:3000/products/${productId}/styles`)
      .then((res) => res.json())
      .catch((err) => { throw err; })
      .then((response) => this.setState({ productStyles: response.results }, () => { this.imageUrlChangeHandler(); this.skuChangeHandler(); this.setState({ price: defaultPrice }); }));
  }

  //  HANDLERS:
  //  Style Selector change
  styleChangeHandler = (styleNum) => {
    const { productStyles } = this.state;
    this.setState({ currentStyle: styleNum, maxQty: 0 }, () => { this.imageUrlChangeHandler(); this.skuChangeHandler(); this.setState({ salePrice: productStyles[styleNum].sale_price }); });
  }

  //  Add to Cart Size change
  sizeChangeHandler = (size = 'default') => {
    const { skus } = this.state;

    if (skus.length && skus[0] !== 'null') {
      const skuObj = Object.fromEntries(skus);
      const defSize = skus[0][0];
      const defVal = skuObj[defSize];
      // console.log(defVal);
      const newSize = size === 'default' ? skus[0][0] : size;
      let max = size === 'default' ? skuObj[defSize] : skuObj[size];
      max = max > 15 ? 15 : max;
      this.setState({ selectedSize: (newSize) }, () => this.setState({ maxQty: max }));
    }
  }


  // MAKE NEW HANDLER FOR maxQty change


  //  SKU change
  skuChangeHandler = () => {
    const { productStyles } = this.state;
    const { currentStyle } = this.state;
    const skus = productStyles.length === 0 ? [] : Object.entries(productStyles[currentStyle].skus);
    this.setState({ skus }, this.sizeChangeHandler);
  }

  //  Add to Cart Qty change
  qtyChangeHandler = (qty) => {
    this.setState({ selectedQty: qty });
  }

  //  Add to Cart button click
  addToCartClickHandler = (e) => {
  //  This could be a little complicated, depending on where it is handled.  Has several features.  See component.
  //  Can handle in component or through handler.  If in component pass all relevant props
    e.preventDefault();
    return alert('Add to cart clicked'); // temporary debug/functionality proof
  }


  // Current Image view change
  currentImageChangeHandler = (imageNum) => {
    this.setState({ selectedImage: imageNum }, this.imageUrlChangeHandler);
  }

  //  Image View State [default, expanded, zoom]
  imageViewFormatChangeHandler = (format = 'default') => {
    // default, expanded, or zoom.  Will be passed in as a string.  Set to default by default, unimaginative, but functional.
    // if no format is passed, resets to default view anyway.
    this.setState({ selectedViewFormat: format }, this.imageUrlChangeHandler);
  }

  //  Current Image URL Change
  imageUrlChangeHandler=() => {
    const { currentStyle } = this.state;
    const { selectedImage } = this.state;
    const { productStyles } = this.state;
    const newUrl = productStyles.length === 0 ? 'https://http.cat/204' : productStyles[currentStyle].photos[selectedImage] ? productStyles[currentStyle].photos[selectedImage].url : 'https://http.cat/204';
    this.setState({ imageUrl: newUrl });
  }

  //  Mouse Position Change (for zoomed image)
  mousePositionChangeHandler=(e) => {
    this.setState({ xPos: e.nativeEvent.offsetX, yPos: e.nativeEvent.offsetY });
  }

  carouselStartIndexHandler=(term) => {
    let { renderedCarouselStartIndex } = this.state;
    const { currentStyle } = this.state;
    const { productStyles } = this.state;
    if (renderedCarouselStartIndex > 0 && term === 'up') {
      renderedCarouselStartIndex -= 1;
    }
    if (productStyles[currentStyle] && renderedCarouselStartIndex < productStyles[currentStyle].photos.length && term === 'down') {
      renderedCarouselStartIndex += 1;
    }
    this.setState({ renderedCarouselStartIndex });
  }

  render() {
    const { product } = this.props;
    const { productStyles } = this.state;
    const { currentStyle } = this.state;
    const { addToCartClickHandler } = this;
    const { weighted } = this.props;
    const { selectedImage } = this.state;
    const { selectedViewFormat } = this.state;
    const { currentImageChangeHandler } = this;
    const { imageViewFormatChangeHandler } = this;
    const { imageUrl } = this.state;
    const { styleChangeHandler } = this;
    const { qtyChangeHandler } = this;
    const { sizeChangeHandler } = this;
    const { skus } = this.state;
    const { selectedSize } = this.state;
    const { selectedQty } = this.state;
    const { renderedCarouselStartIndex } = this.state;
    const { carouselStartIndexHandler } = this;
    const { maxQty } = this.state;
    const { xPos } = this.state;
    const { yPos } = this.state;
    const { mousePositionChangeHandler } = this;
    const rightWidth = selectedViewFormat === 'default' ? 'w-1/4' : 'w-0';
    const leftWidth = selectedViewFormat === 'default' ? 'w-1/2' : 'w-3/4';
    const { salePrice } = this.state;
    const { defaultPrice } = this.state;
    const rightColumnHtml = selectedViewFormat === 'default' ? (
      <div>
        <ProductInformation
          product={product}
          productStyles={productStyles}
          reviewScore={weighted}
          salePrice={salePrice}
          defaultPrice={defaultPrice}
        />
        <StyleSelector
          product={product}
          productStyles={productStyles}
          styleChangeHandler={styleChangeHandler}
          currentStyle={currentStyle}
        />
        <AddToCart
          product={product}
          productStyles={productStyles}
          addToCartClickHandler={addToCartClickHandler}
          skus={skus}
          sizeChangeHandler={sizeChangeHandler}
          qtyChangeHandler={qtyChangeHandler}
          selectedSize={selectedSize}
          selectedQty={selectedQty}
          maxQty={maxQty}
        />
      </div>
    ) : (<div />);


    return (
      <div id="productOverview">
        <div id="upperBar" className="flex w-full h-20 my-2">
          <h2 id="logo" className=" font-extrabold text-2xl self-center ml-48 mr-auto underline italic">Logo</h2>
          <input className="h-4 self-center mr-4" />
          <span className="object-left self-center mr-64 cursor-pointer">&#128269;</span>
        </div>

        <div className="flex mb-4">

          <div id="leftColumn" className={`${leftWidth} overflow-hidden relative ml-auto`}>
            {/* <h1>Left Column</h1> */}
            <div className="w-full h-auto">
              <ImageView
                product={product}
                currentStyle={currentStyle}
                productStyles={productStyles}
                selectedImage={selectedImage}
                selectedViewFormat={selectedViewFormat}
                currentImageChangeHandler={currentImageChangeHandler}
                imageViewFormatChangeHandler={imageViewFormatChangeHandler}
                imageUrl={imageUrl}
                xPos={xPos}
                yPos={yPos}
                mousePositionChangeHandler={mousePositionChangeHandler}
                renderedCarouselStartIndex={renderedCarouselStartIndex}
                carouselStartIndexHandler={carouselStartIndexHandler}
              />
            </div>
            <div className="w-full">
              <ProductDetails
                product={product}
                productStyles={productStyles}
              />
            </div>

          </div>

          <div id="rightColumn" className={`${rightWidth} relative bg-gray-100 mr-auto`}>
            {/* <h1>Right Column</h1> */}
            {rightColumnHtml}
          </div>


        </div>

      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  product: state.product,
  weighted: state.weighted,
});

export default connect(mapPropsToState)(ProductOverview);
