import ShoppingCart from './components/ShoppingCart.jsx';

function App() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">K0126002 · Week 12 homework</p>
        <h1>
          Interactive <span className="marker">shopping cart</span>
        </h1>
        <p className="lead">
          Six products, add and remove buttons, quantity controls and a cart that works out the total. The cart
          is state in one parent component, and it is remembered after a refresh.
        </p>
      </header>
      <ShoppingCart />
    </>
  );
}

export default App;
