let initialState = {
  products: [
    { code: 'X7R2OPX', name: 'TShirt', imgSrc: 'img/shirt.png', price: 20, priceCurrency: '€' },
    { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: 5, priceCurrency: '€' },
    { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' },
    { code: 'newprodcode', name: 'newprod', imgSrc: 'img/cap.png', price: 500, priceCurrency: '€' }
  ],

  shoppingCartByCode: {
    X7R2OPX: { code: 'X7R2OPX', quantity: 3 },
    X2G2OPZ: { code: 'X2G2OPZ', quantity: 4 },
    X3W2OPY: { code: 'X3W2OPY', quantity: 4 }
  },
  shoppingCartCodeList: [
    'X7R2OPX',
    'X2G2OPZ',
    'X3W2OPY'
  ],

  productCodeList: [
    'X7R2OPX',
    'X2G2OPZ',
    'X3W2OPY',
    'newprodcode'
  ],

  productByCode: {
    X7R2OPX: { code: 'X7R2OPX', name: 'TShirt', imgSrc: 'img/shirt.png', price: 20, priceCurrency: '€' },
    X2G2OPZ: { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: 5, priceCurrency: '€' },
    X3W2OPY: { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' },
    newprodcode: { name: 'newprod', imgSrc: 'img/cap.png', price: 500, priceCurrency: '€' }
  },

  productDiscountsByCode: {
    X7R2OPX: { description: 'x3 TShirt offer', isApplicable: threeOrMore, calculate: calculatMoreThanThree },
    X2G2OPZ: { description: '2x1 Mug offer', isApplicable: twoOrMore, calculate: twoForOne }
  }
};

function calculatMoreThanThree(unitaryPrice, productQuantity) {
  return unitaryPrice * productQuantity * 0.05;
}

function twoForOne(unitaryPrice, productQuantity) {
  return unitaryPrice * parseInt(productQuantity / 2);
}

function twoOrMore(number) {
  return number >= 2;
}

function threeOrMore(number){
  return number >= 3;
}

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
    case 'SET':
      if (action.quantity >= 0) {
        shoppingCartByCode[action.code].quantity = parseInt(action.quantity);
      }
      return {
        ...state,
        shoppingCartByCode: shoppingCartByCode,
      };
    case 'SCAN':
      if (shoppingCartByCode[action.code]) {
        shoppingCartByCode[action.code].quantity += 1;
      } else {
        let product = state.products.find(product => product.code === action.code);
        if (product) {
          state.shoppingCartCodeList.push(product.code);
          shoppingCartByCode[product.code] = {code: product.code, quantity: 1}
        }
      }
      return {
        ...state,
        shoppingCartByCode: shoppingCartByCode
      };
    default:
      return state
  }
}