let initialState = {
  products: [
    { code: 'X7R2OPX', name: 'Shirt', imgSrc: 'img/shirt.png', price: 20, priceCurrency: '€' },
    { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: 5, priceCurrency: '€' },
    { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' },
    { code: 'newProduct', name: 'newProduct', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' }
  ],

  shoppingCartByCode: {
    X7R2OPX: { code: 'X7R2OPX', quantity: 3 },
    X2G2OPZ: { code: 'X2G2OPZ', quantity: 4 },
    X3W2OPY: { code: 'X3W2OPY', quantity: 4 }
  },

  shoppingCartList: [
    'X7R2OPX',
    'X2G2OPZ',
    'X3W2OPY'
  ],

  productByCode: {
    X7R2OPX: { code: 'X7R2OPX', name: 'Shirt', imgSrc: 'img/shirt.png', price: 20, priceCurrency: '€' },
    X2G2OPZ: { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: 5, priceCurrency: '€' },
    newOne: { code: 'newOne', name: 'newOne', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' },
    X3W2OPY: { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' }
  },

  productList: [
    'X7R2OPX',
    'X2G2OPZ',
    'newOne',
    'X3W2OPY'
  ]
};

function shoppingCartReducer(state = initialState, action) {
  const shoppingCartByCode = Object.assign({}, state.shoppingCartByCode);

  switch (action.type) {
    case 'INCREMENT':
      shoppingCartByCode[action.code].quantity += 1;
      return {
        ...state,
        shoppingCartByCode: shoppingCartByCode,
      };
    case 'DECREMENT':
      if (shoppingCartByCode[action.code].quantity > 0) {
        shoppingCartByCode[action.code].quantity -= 1;
      }
      return {
        ...state,
        shoppingCartByCode: shoppingCartByCode,
      };
    default:
      return state
  }
}