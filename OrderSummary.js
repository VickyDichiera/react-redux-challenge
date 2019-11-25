'use strict';
class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <React.Fragment>
        <ul className="summary-items wrapper border">
          <li>
            <span className="summary-items-number">11 Items</span
            ><span className="summary-items-price"
            >120<span className="currency">€</span></span
            >
          </li>
        </ul>
        <div className="summary-discounts wrapper-half border">
          <h2>Discounts</h2>
          <ul>
            <li><span>2x1 Mug offer</span><span>-10€</span></li>
            <li><span>x3 Shirt offer</span><span>-3€</span></li>
            <li><span>Promo code</span><span>0€</span></li>
          </ul>
        </div>
        <div className="summary-total wrapper">
          <ul>
            <li>
              <span className="summary-total-cost">Total cost</span
              ><span className="summary-total-price">107€</span>
            </li>
          </ul>
          <button type="submit">Checkout</button>
        </div>
      </React.Fragment>
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
    checkoutOrder: () => {
      dispatch({ type: 'CHECKOUT' })
    }
  }
};

const OrderSummaryContainer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);