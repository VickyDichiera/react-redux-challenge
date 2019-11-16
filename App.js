'use strict';

function App() {
  
  return (
    <main className="App">
      <section className="products">
        <h1 className="main">Shopping cart</h1>
          <Products></Products>
      </section>
      <aside className="summary">
        <h1 className="main">Order Summary</h1>
      </aside>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));