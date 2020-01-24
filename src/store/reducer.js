const initialState = {
  product: {
    id: 1,
    name: ''
  }
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