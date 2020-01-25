import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProductOverview from './product-overview/ProductOverview';
import QuestionAnswer from './question-answer/QuestionAnswer';
import Reviews from './reviews/Reviews';

const Product = ({ productStore, setProductInStore }) => {
  const { id } = useParams();
  //  set the initial product variable to what we have as our product in our store
  const [product, setProduct] = useState(productStore);

  /* eslint-disable no-undef */
  fetch(`http://3.134.102.30/products/${id}`)
    .then((res) => res.json())
    .then((result) => {
      //  we could call props.setProduct here but we can
      //  let the useEffect callback handle that change
      setProduct(result);
    });

  //  useEffect listens for the product to change and runs the anonymous callback
  //  This is where we want to fill our store with the returned product
  useEffect(() => {
    setProductInStore(product);
  }, ['product']);

  return (
    <div className="product">
      <div style={{ marginTop: '3em' }}>
        <ProductOverview />
        <QuestionAnswer />
        <Reviews />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productStore: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  setProductInStore: (product) => { dispatch({ type: 'SET_PRODUCT', payload: product }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
