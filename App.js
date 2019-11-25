'use strict';

function App(props) {
  return (
    <main className="App">
      <section className="products">
        <h1 className="main">Shopping cart</h1>
        <ShoppingCartContainer></ShoppingCartContainer>
      </section>
      <aside className="summary">
        <h1 className="main">Order Summary</h1>
        <OrderSummaryContainer></OrderSummaryContainer>
      </aside>
    </main>
  );
}

let store = Redux.createStore(
  shoppingCartReducer,
  //Add devtools support
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>,
  document.getElementById('root')
)

