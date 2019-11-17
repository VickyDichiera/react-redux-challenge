'use strict';
class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    
    this.updateProductCart = this.updateProductCart.bind(this);
  }

  updateProductCart(method, productCode) {
    this.dispatch
    let productFound = this.props.shoppingCartProduct.find(product => product.code === productCode);
    debugger;
    if(productFound) {
      if (method === 'add') {
        productFound.quantity++;
      } else {
        if (productFound > 0) {
          productFound.quantity--;
        }
      }
    }
  }

  render() {
    return (
     <ul className="products-list tableHead">
      <li className="products-list-title row">
        <div className="col-product">Product details</div>
        <div className="col-quantity">Quantity</div>
        <div className="col-price">Price</div>
        <div className="col-total">Total</div>
      </li>

      {this.props.shoppingCartProduct.map((product) =>
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
            <button className="count" onClick={() => this.updateProductCart('delete', product.code)}>-</button>
              <input type="text" className="product-quantity" value={product.quantity} onChange={()=> console.log('updated')}/>
            <button className="count" onClick={() =>this.updateProductCart('add', product.code)}>+</button>
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
