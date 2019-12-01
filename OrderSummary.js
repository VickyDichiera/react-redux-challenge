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
      discounts: [{code: 'promoCode', description: 'Promo code', total: 0}],
      total: 0
    };

    let accumulatedDiscounts = 0;

    shoppingCartCodeList.forEach(code => {
      const productData = productByCode[code] ? productByCode[code] : null;
      if (productData) {
        const unitaryPrice = productByCode[code].price;
        const productQuantity = shoppingCartByCode[code].quantity;

        mappedData.totalQuantity += productQuantity;
        mappedData.subTotal += unitaryPrice * productQuantity;

        if(this.props.productDiscountsByCode[code]){
          const discount = this.props.productDiscountsByCode[code];
          if (discount.isApplicable(productQuantity)) {
            const discountValue = discount.calculate(unitaryPrice, productQuantity);
            accumulatedDiscounts += discountValue;
            mappedData.discounts.push({code: code, description: discount.description, total: discountValue})
          }
        }
      }
    });

    mappedData.total = mappedData.subTotal - accumulatedDiscounts;


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
          {orderSummaryMapped.discounts.map((discount) =>
            <li key={discount.code}><span>{discount.description}</span><span>-{discount.total}€</span></li>
          )}
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
    productDiscountsByCode: state.productDiscountsByCode
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