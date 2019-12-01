'use strict';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    window.checkoutInstance = this;
  }

  //Ass products to the checkout with the scan method, passing the product ID as string in his first argument
  scan(productName) {
    let product = this.props.products.find(product => product.name.toUpperCase() === productName.toUpperCase());
    let productCode = product ? product.code : null;
    if (productCode) {
      this.props.scanProduct(productCode);
    }
  }

  //Return total with discounts already applied
  total() {
    let subTotal = 0;
    let accumulatedDiscounts = 0;

    const {shoppingCartCodeList, productByCode, shoppingCartByCode} = this.props;

    shoppingCartCodeList.forEach(code => {
      const productData = productByCode[code] ? productByCode[code] : null;
      if (productData) {
        const unitaryPrice = productByCode[code].price;
        const productQuantity = shoppingCartByCode[code].quantity;

        subTotal += unitaryPrice * productQuantity;

        if(this.props.productDiscountsByCode[code]){
          const discount = this.props.productDiscountsByCode[code];
          if (discount.isApplicable(productQuantity)) {
            const discountValue = discount.calculate(unitaryPrice, productQuantity);
            accumulatedDiscounts += discountValue;
          }
        }
      }
    });

    return subTotal - accumulatedDiscounts;
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    shoppingCartCodeList: state.shoppingCartCodeList,
    productByCode: state.productByCode,
    shoppingCartByCode: state.shoppingCartByCode,
    productDiscountsByCode: state.productDiscountsByCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    scanProduct: code => {
      dispatch(scanProduct(code))
    }
  }
};

const CheckoutContainer = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);