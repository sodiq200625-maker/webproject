import { useState } from 'react';

// Study guide, exercise 1: a button that shows and hides a paragraph, using boolean state.
function ToggleDetail() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="card">
      <button type="button" aria-expanded={isVisible} onClick={() => setIsVisible((prev) => !prev)}>
        {isVisible ? 'Hide details' : 'Show details'}
      </button>
      {isVisible && <p className="reveal-text">React state enables dynamic UIs without page reloads.</p>}
    </div>
  );
}

export default ToggleDetail;
