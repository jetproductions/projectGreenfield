import product from '../../sampleData/product/product';

const initialState = {
  product,
  weighted: 3.5,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PRODUCT':
      return (
        {
          ...state,
          product: payload,
        }
      );
    case 'SET_WEIGHTED_AVERAGE':
      return (
        {
          ...state,
          weighted: payload,
        }
      );
    default:
      return state;
  }
};

export default reducer;
