import { useState } from 'react';

// Monday code challenge: a counter with history.
//   1. show the count (starts at 0)      2. +1 and -1 buttons     3. Reset (back to 0)
//   4. show the last 5 count values      5. Undo goes back to the previous value in the history
// Two state variables: count, and history (an array). Every change adds to the history.
function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  function change(next) {
    setCount(next);
    setHistory((prev) => [...prev, next].slice(-5)); // new array every time, never push
  }

  function undo() {
    if (history.length < 2) return; // nothing to go back to
    setCount(history[history.length - 2]);
    setHistory((prev) => prev.slice(0, -1)); // drop the last item
  }

  return (
    <div className="card counter">
      <p className="big" aria-live="polite">{count}</p>
      <div className="buttons">
        <button type="button" onClick={() => change(count + 1)}>+1</button>
        <button type="button" onClick={() => change(count - 1)}>-1</button>
        <button type="button" onClick={() => change(0)}>Reset</button>
        <button type="button" onClick={undo} disabled={history.length < 2}>Undo</button>
      </div>
      <p className="history">History: [{history.join(', ')}]</p>
    </div>
  );
}

export default CounterWithHistory;
