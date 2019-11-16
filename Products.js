'use strict';

function Products() {
  const products = [
    { code: 'X7R2OPX', name: 'Shirt', imgSrc: 'img/shirt.png', price: { value: 20, currency: '€' } },
    { code: 'X2G2OPZ', name: 'Mug', imgSrc: 'img/mug.png', price: { value: 5, currency: '€' } },
    { code: 'X3W2OPY', name: 'Cap', imgSrc: 'img/cap.png', price: { value: 10, currency: '€' } }
  ];
  return (
    <ul className="products-list tableHead">
      <li className="products-list-title row">
        <div className="col-product">Product details</div>
        <div className="col-quantity">Quantity</div>
        <div className="col-price">Price</div>
        <div className="col-total">Total</div>
      </li>

      {products.map((product) =>
        <li key={product.code} className="product row">
          <div className="col-product">
            <figure className="product-image">
              <img src={product.imgSrc} alt={product.name} />
              <div className="product-description">
                <h1>{product.name}</h1>
                <p className="product-code">Product code {product.code}</p>
              </div>
            </figure>
          </div>
          <div className="col-quantity">
            <button className="count">-</button>
              {/* <input type="text" className="product-quantity" value="3" /> */}
            <button className="count">+</button>
          </div>
          <div className="col-price">
            <span className="product-price">{product.price.value}</span><span className="product-currency currency">{product.price.currency}</span>
          </div>
          <div className="col-total">
            <span className="product-price">60</span><span className="product-currency currency">{product.price.currency}</span>
          </div>
        </li>
      )}

    </ul>
  );
}

