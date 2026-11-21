import { formatWon } from '../products.js';

// The cart sidebar: the lines, quantity controls (+ and -), a remove button and the total.
// Everything shown is worked out from the `lines` it receives; it has no state of its own.
function Cart({ lines, total, count, onChangeQty, onRemove, onClear }) {
  return (
    <aside className="cart" aria-labelledby="cart-title">
      <h2 id="cart-title">Your cart</h2>
      {lines.length === 0 ? (
        <p className="muted">The cart is empty. Add something from the list.</p>
      ) : (
        <ul className="cart-lines">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="cart-line">
              <div className="cart-line-top">
                <span className="cart-name">{product.name}</span>
                <span>{formatWon(product.price * qty)}</span>
              </div>
              <div className="cart-line-bottom">
                <span className="qty">
                  <button type="button" className="small" aria-label={`One less ${product.name}`} disabled={qty <= 1} onClick={() => onChangeQty(product.id, -1)}>−</button>
                  <output aria-label={`${product.name} quantity`}>{qty}</output>
                  <button type="button" className="small" aria-label={`One more ${product.name}`} disabled={qty >= 99} onClick={() => onChangeQty(product.id, 1)}>+</button>
                </span>
                <button type="button" className="link" onClick={() => onRemove(product.id)}>
                  Remove<span className="sr-only"> {product.name}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total" aria-live="polite">
        <span>{count} {count === 1 ? 'item' : 'items'}</span>
        <strong>Total: {formatWon(total)}</strong>
      </div>
      {lines.length > 0 && (
        <button type="button" className="link clear" onClick={onClear}>Empty the cart</button>
      )}
    </aside>
  );
}

export default Cart;
