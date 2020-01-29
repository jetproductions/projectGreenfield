import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatings from '../utility/stars/StarRatings';
import AddToCart from './AddToCart';
import ImageView from './ImageView';
import ProductDetails from './ProductDetails';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';

/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */

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
    this.state = {
      //         [product]: passed from PRODUCT OVERVIEW in props, from store
      //         [productStyles]: passed from API call method in constructor.
      //         [currentStyle]: defaults to FIRST style in list.  Changed by Style Selector component
      //         [SelectedSize]: defaults to "Select Size".  Changed by Add to Cart component
      //         [SelectedQty]: defaults to 1, max is 15.  Changed by Add to Cart component
      //         [selectedImage]; defaults to 0, i.e. first.  Changed by ImageView component
      //         [selectedViewFormat]: default, expanded or zoomed.   view slides out, over RIGHT COLUMN, zoom is responsive to mouse position 250% zoom
      productStyles: [],
      currentStyle: 0,
      selectedSize: '',
      selectQty: 1,
      selectedImage: 0,
      selectedViewFormat: 'default',
    };

    this.getProductStyles(id);

    // Handler Binds
    this.styleChangeHandler = this.styleChangeHandler.bind(this);
    this.sizeChangeHandler = this.sizeChangeHandler.bind(this);
    this.qtyChangeHandler = this.qtyChangeHandler.bind(this);
    this.addToCartClickHandler = this.addToCartClickHandler.bind(this);
    this.currentImageChangeHandler = this.currentImageChangeHandler.bind(this);
    this.imageViewFormatChangeHandler = this.imageViewFormatChangeHandler.bind(this);
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
    return fetch(`http://3.134.102.30/products/${productId}/styles`)
      .then((res) => res.json())
      .catch((err) => { throw err; })
      .then((response) => this.setState({ productStyles: response.results }));
  }

  //  HANDLERS:
  //  Style Selector change
  styleChangeHandler = (styleNum) => {
    this.setState({ currentStyle: styleNum });
  }

  //  Add to Cart Size change
  sizeChangeHandler = (size) => {
    this.setState({ selectedSize: size });
  }

  //  Add to Cart Qty change
  qtyChangeHandler = (qty) => {
    this.setState({ selectQty: qty });
  }

  //  Add to Cart button click
  addToCartClickHandler = (e) => {
  //  This could be a little complicated, depending on where it is handled.  Has several features.  See component.
  //  Can handle in component or through handler.  If in component pass all relevant props
    e.preventDefault();
    return alert('Add to cart clicked');
  }


  // Current Image view change
  currentImageChangeHandler = (imageNum) => {
    this.setState({ selectedImage: imageNum });
  }

  //  Image View State [default, expanded, zoom]
  imageViewFormatChangeHandler = (format = 'default') => {
    // default, expanded, or zoom.  Will be passed in as a string.  Set to default by default, unimaginative, but functional.
    // if no format is passed, resets to default view anyway.
    this.setState({ selectedViewFormat: format });
  }

  render() {
    const { product } = this.props;
    const { productStyles } = this.state;
    const { currentStyle } = this.state;
    const { addToCartClickHandler } = this;
    const { weighted } = this.props;
    return (
      <div>
        <h3>Product Overview</h3>
        <div className="flex mb-4">

          <div id="leftColumn" className="w-1/2 ml-auto bg-gray-300 h-100">
            <h1>Left Column</h1>
            <ImageView product={product} currentStyle={currentStyle} productStyles={productStyles} />
            <ProductDetails product={product} productStyles={productStyles} />
          </div>

          <div id="rightColumn" className="w-1/4 mr-auto bg-gray-100 h-100">
            <h1>Right Column</h1>
            <ProductInformation product={product} productStyles={productStyles} reviewScore={weighted} />
            <StyleSelector product={product} productStyles={productStyles} />
            <AddToCart product={product} productStyles={productStyles} addToCartClickHandler={addToCartClickHandler} />
          </div>


        </div>
        <div id="endOfOverview" />
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  product: state.product,
  weighted: state.weighted,
});

export default connect(mapPropsToState)(ProductOverview);
