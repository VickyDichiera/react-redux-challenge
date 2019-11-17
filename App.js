'use strict';

function App() {
  const PRODUCTS = [
    { code: 'X7R2OPX', name: 'Shirt', imgSrc: 'img/shirt.png', price: 20, priceCurrency: '€' },
    { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: 5, priceCurrency: '€' },
    { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' }
  ];
  
  let shoppingCartByCode = {
    X7R2OPX: { code: 'X7R2OPX', quantity: 3 },
    X2G2OPZ: { code: 'X2G2OPZ', quantity: 4 },
    X3W2OPY: { code: 'X3W2OPY', quantity: 4 }
  };

  let shoppingCartList = [
    'X7R2OPX',
    'X2G2OPZ',
    'X3W2OPY'
  ]

  let productByCode = {
    X7R2OPX: { code: 'X7R2OPX', name: 'Shirt', imgSrc: 'img/shirt.png', price: 20, priceCurrency: '€' },
    X2G2OPZ: { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: 5, priceCurrency: '€' } ,
    newOne: { code: 'newOne', name: 'newOne', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€' },
    X3W2OPY: { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: 10, priceCurrency: '€'  }
  };

  let productList = [
    'X7R2OPX',
    'X2G2OPZ',
    'newOne',
    'X3W2OPY'
  ];

  let shoppingCartProductMap = shoppingCartList.map(code => {
    let productData = productByCode[code] ? productByCode[code] : null;
    let mappedData = {};
    if (productData) {
      mappedData.code = code;
      mappedData.name = productData.name;
      mappedData.imgSrc = productData.imgSrc;
      mappedData.price = productData.price;
      mappedData.priceCurrency = productData.priceCurrency;

      mappedData.quantity = shoppingCartByCode[code].quantity;
      mappedData.total = mappedData.price * mappedData.quantity;
    }

    return mappedData;
  });


  return (
    <main className="App">
      <section className="products">
        <h1 className="main">Shopping cart</h1>
        <ShoppingCart shoppingCartProduct={shoppingCartProductMap}></ShoppingCart>
      </section>
      <aside className="summary">
        <h1 className="main">Order Summary</h1>
      </aside>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));