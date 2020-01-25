import product from '../../sampleData/product/product'

const initialState = {
  product
}

const reducer = (state = initialState, {type, payload}) => {
  switch (type){
    case 'SET_PRODUCT':
      return (
        {
          ...state,
          product: payload 
        }
      )
    default:
      return state
  }
}

export default reducer