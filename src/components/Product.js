import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProductOverview from './product-overview/ProductOverview';
import QuestionAnswer from './question-answer/QuestionAnswer';
import Reviews from './reviews/Reviews';

/* eslint-disable no-undef */
const getProduct = (id) => fetch(`http://3.134.102.30/products/${id}`).then((res) => res.json());

const Product = ({ productStore, setProductInStore }) => {
  //  set the initial product variable to what we have as our product in our store
  const { id } = useParams();

  // if the param id does not match the productStore.id then we need to make
  // a new api request and update the store
  if (Number(id) !== Number(productStore.id)) {
    getProduct(id).then((result) => {
      // update the product in the store
      setProductInStore(result);
    });
  }

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
