import { useState } from 'react';

// Study guide, exercise 3: lifting state up. The two scores live in the parent (ScoreBoard),
// which hands each child its value and callbacks, so the parent can show the combined total.
function PlayerScore({ name, score, onIncrement, onDecrement }) {
  return (
    <div className="card">
      <h3>{name}: {score}</h3>
      <div className="buttons">
        <button type="button" aria-label={`Subtract one from ${name}`} onClick={onDecrement}>−</button>
        <button type="button" aria-label={`Add one to ${name}`} onClick={onIncrement}>+</button>
      </div>
    </div>
  );
}

function ScoreBoard() {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);

  return (
    <div className="stack">
      <div className="cards">
        <PlayerScore name="Player 1" score={p1} onIncrement={() => setP1((p) => p + 1)} onDecrement={() => setP1((p) => p - 1)} />
        <PlayerScore name="Player 2" score={p2} onIncrement={() => setP2((p) => p + 1)} onDecrement={() => setP2((p) => p - 1)} />
      </div>
      <h3 className="total" aria-live="polite">Total: {p1 + p2}</h3>
    </div>
  );
}

export default ScoreBoard;
