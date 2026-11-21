import { useEffect, useState } from 'react';

// Monday practice: "Add a live word count to a textarea with useState".
// The text is the only state; the word count is worked out while rendering (no extra state).
export function WordCount() {
  const [text, setText] = useState('');
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="card">
      <label htmlFor="wc-text">Write something</label>
      <textarea id="wc-text" rows="4" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here..." />
      <p className="muted" aria-live="polite">{words} {words === 1 ? 'word' : 'words'}</p>
    </div>
  );
}

// Friday practice: "Add a live character count to any input using useEffect".
// The effect copies the length into its own state after every change of the text. That is only
// here to practise useEffect: the count could simply be text.length while rendering, which is
// what the "you might not need an effect" slide recommends.
export function CharCountEffect() {
  const [text, setText] = useState('');
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(text.length);
  }, [text]);

  return (
    <div className="card">
      <label htmlFor="cc-text">Type in the box</label>
      <input id="cc-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here..." />
      <p className="muted" aria-live="polite">{chars} {chars === 1 ? 'character' : 'characters'}</p>
    </div>
  );
}
