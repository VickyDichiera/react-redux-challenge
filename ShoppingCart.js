'use strict';
class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    //this.updateProductCart = this.updateProductCart.bind(this);
    this.addProductCartQuantity = this.addProductCartQuantity.bind(this);
    this.deleteProductCartQuantity = this.deleteProductCartQuantity.bind(this);
    this.setProductCartQuantity = this.setProductCartQuantity.bind(this);
  }

  shoppingCartMapper(shoppingCartList, productByCode, shoppingCartByCode) {
    return shoppingCartList.map(code => {
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
    })
  }

  addProductCartQuantity(productCode) {
    this.props.incrementProductQuantity(productCode);
  }

  deleteProductCartQuantity(productCode) {
    if (this.props.shoppingCartByCode[productCode].quantity > 0) {
      this.props.decrementProductQuantity(productCode)
    }
  }

  setProductCartQuantity(quantity, productCode) {
    if (quantity >= 0 ) {
      this.props.setProductQuantity(productCode, quantity);
    }
  }

  render() {
    let shoppingCartProductsMapped = this.shoppingCartMapper(this.props.shoppingCartList, this.props.productByCode, this.props.shoppingCartByCode);

    return (
      <ul className="products-list tableHead">
        <li className="products-list-title row">
          <div className="col-product">Product details</div>
          <div className="col-quantity">Quantity</div>
          <div className="col-price">Price</div>
          <div className="col-total">Total</div>
        </li>

        {shoppingCartProductsMapped.map((product) =>
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
              <button className="count" onClick={() => this.deleteProductCartQuantity(product.code)}>-</button>
              <input type="text" className="product-quantity" value={product.quantity} onChange={ev => this.setProductCartQuantity(ev.target.value, product.code)} />
              <button className="count" onClick={() => this.addProductCartQuantity(product.code)}>+</button>
            </div>
            <div className="col-price">
              <span className="product-price">{product.price}</span><span className="product-currency currency">{product.priceCurrency}</span>
            </div>
            <div className="col-total">
              <span className="product-price">{product.total}</span><span className="product-currency currency">{product.priceCurrency}</span>
            </div>
          </li>
        )}

      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingCartList: state.shoppingCartList,
    productByCode: state.productByCode,
    shoppingCartByCode: state.shoppingCartByCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementProductQuantity: code => {
      dispatch(incrementProductQuantity(code))
    },
    decrementProductQuantity: code => {
      dispatch(decrementProductQuantity(code))
    },
    setProductQuantity: (code, quantity) => {
      dispatch(setProductQuantity(code, quantity))
    }
  }
};

const ShoppingCartContainer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);