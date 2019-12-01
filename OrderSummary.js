'use strict';
class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
    Calculate totals with discounts applied
  */
  orderSummaryMapper(shoppingCartCodeList, productByCode, shoppingCartByCode) {

    /**
     * 0(pin):"X7R2OPX"
  1(pin):"X2G2OPZ"
  2(pin):"X3W2OPY"
  3(pin):"newprodcode"
     */
    let mappedData = {
      totalQuantity: 0,
      subTotal: 0,
      total: 0
    };

    shoppingCartCodeList.forEach(code => {
      let productData = productByCode[code] ? productByCode[code] : null;
      if (productData) {
        mappedData.totalQuantity += shoppingCartByCode[code].quantity;
        mappedData.subTotal += productByCode[code].price * shoppingCartByCode[code].quantity;
        mappedData.total = mappedData.subTotal;
      }
    });

    return mappedData;
  }

  render() {
    const orderSummaryMapped = this.orderSummaryMapper(this.props.shoppingCartCodeList, this.props.productByCode, this.props.shoppingCartByCode);

    return (
      <React.Fragment>
        <ul className="summary-items wrapper border">
          <li>
            <span className="summary-items-number">{orderSummaryMapped.totalQuantity} Items</span>
            <span className="summary-items-price">{orderSummaryMapped.subTotal}<span className="currency">€</span></span>
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
              ><span className="summary-total-price">{orderSummaryMapped.total}€</span>
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
    shoppingCartCodeList: state.shoppingCartCodeList,
    productByCode: state.productByCode,
    shoppingCartByCode: state.shoppingCartByCode,
    discountsByCode: state.discountsByCode
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