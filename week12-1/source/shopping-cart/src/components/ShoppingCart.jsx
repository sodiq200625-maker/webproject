import { useEffect, useState } from 'react';
import { products } from '../products.js';
import ProductList from './ProductList.jsx';
import Cart from './Cart.jsx';

const STORAGE_KEY = 'week12-shopping-cart';

// The cart is read from localStorage once, when the component first renders (a lazy initial
// state), so it is still there after a refresh. A broken or missing value just gives an empty cart.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) {
      return saved.filter((line) => products.some((p) => p.id === line.id) && Number.isInteger(line.qty) && line.qty > 0);
    }
  } catch {
    /* storage blocked or invalid JSON */
  }
  return [];
}

// ShoppingCart: state lives here, in the nearest common parent of the product list and the cart
// (lifting state up). Cart state is an array of { id, qty }: the product data itself is not copied.
function ShoppingCart() {
  const [cart, setCart] = useState(loadCart);

  // keep localStorage in sync with the cart (an effect: it talks to something outside React)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage blocked: the cart still works, it just is not remembered */
    }
  }, [cart]);

  function addToCart(id) {
    setCart((prev) =>
      prev.some((line) => line.id === id)
        ? prev.map((line) => (line.id === id ? { ...line, qty: Math.min(99, line.qty + 1) } : line))
        : [...prev, { id, qty: 1 }],
    );
  }

  function changeQty(id, amount) {
    setCart((prev) => prev.map((line) => (line.id === id ? { ...line, qty: Math.min(99, Math.max(1, line.qty + amount)) } : line)));
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((line) => line.id !== id));
  }

  // derived from state while rendering: no extra state to keep in sync
  const lines = cart.map((line) => ({ product: products.find((p) => p.id === line.id), qty: line.qty }));
  const total = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const count = lines.reduce((sum, { qty }) => sum + qty, 0);
  const inCart = Object.fromEntries(cart.map((line) => [line.id, line.qty]));

  return (
    <div className="shop">
      <ProductList products={products} inCart={inCart} onAdd={addToCart} />
      <Cart lines={lines} total={total} count={count} onChangeQty={changeQty} onRemove={removeFromCart} onClear={() => setCart([])} />
    </div>
  );
}

export default ShoppingCart;
