import product from '../../sampleData/product/product';

const initialState = {
  product,
  weighted: 3.5,
  totalReviews: 0,
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
    case 'SET_TOTAL_REVIEWS':
      return (
        {
          ...state,
          totalReviews: payload,
        }
      );
    default:
      return state;
  }
};

export default reducer;
