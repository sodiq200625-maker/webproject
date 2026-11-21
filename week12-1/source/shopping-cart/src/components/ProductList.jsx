import { formatWon } from '../products.js';

// The product list: one card per product with an "Add to cart" button.
// It owns no state: the cart lives in ShoppingCart, which passes onAdd down.
function ProductList({ products, inCart, onAdd }) {
  return (
    <ul className="products" aria-label="Products">
      {products.map((p) => (
        <li key={p.id} className="product">
          <img src={p.image} alt={p.name} width="240" height="160" loading="lazy" />
          <div className="product-body">
            <h2>{p.name}</h2>
            <p className="muted">{p.description}</p>
            <p className="price">{formatWon(p.price)}</p>
            <button type="button" aria-label={`Add to cart: ${p.name}`} onClick={() => onAdd(p.id)}>
              Add to cart
            </button>
            {inCart[p.id] > 0 && <p className="in-cart">{inCart[p.id]} in cart</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
