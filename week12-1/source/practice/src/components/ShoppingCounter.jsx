import { useState } from 'react';

// Monday video lecture challenge: three items, each with a quantity (- and +), a quantity that
// cannot go below 0, and a total worked out from quantity x price.
// State: one object that maps an item id to its quantity, e.g. { 1: 2, 2: 0, 3: 1 }.
const items = [
  { id: 1, name: '커피', price: 4500 },
  { id: 2, name: '샌드위치', price: 7000 },
  { id: 3, name: '물', price: 1000 },
];

function ShoppingCounter() {
  const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0 });

  function change(id, amount) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + amount) })); // never below 0
  }

  const total = items.reduce((sum, item) => sum + item.price * quantities[item.id], 0);

  return (
    <div className="card">
      <ul className="plain-list">
        {items.map((item) => (
          <li key={item.id} className="line">
            <span>{item.name} <span className="muted">{item.price.toLocaleString('ko-KR')}원</span></span>
            <span className="qty">
              <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => change(item.id, -1)} disabled={quantities[item.id] === 0}>−</button>
              <output>{quantities[item.id]}</output>
              <button type="button" aria-label={`Add one ${item.name}`} onClick={() => change(item.id, 1)}>+</button>
            </span>
          </li>
        ))}
      </ul>
      <p className="total">Total: <strong>{total.toLocaleString('ko-KR')}원</strong></p>
    </div>
  );
}

export default ShoppingCounter;
