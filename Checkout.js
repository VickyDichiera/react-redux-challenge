'use strict';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    window.checkoutInstance = this;
  }

  /*
  Have a Checkout class, that can be instantiated with products and discounts available.
  - Allow adding products to the checkout with the scan method,
  passing the product ID as string in his first argument.
  - Allow calculating the total price with the total method,
  which won't accept any arguments and will return the total price (discount already applied) as number.
    Checkout(pricingRules);
  co.scan("TSHIRT").scan("CAP").scan("TSHIRT");
  const totalPrice = co.total();
  */
  scan(productName) {
    let product = this.props.products.find(product => product.name.toUpperCase() === productName.toUpperCase());
    let productCode = product ? product.code : null;
    if (productCode) {
      this.props.scanProduct(productCode);
    }
  }

  total() {
    let totalPrice;
    totalPrice ;

    return totalPrice;
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
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