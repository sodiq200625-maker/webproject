import { useEffect, useState } from 'react';

// Study guide, exercise 1 (Friday): keep document.title in sync with what is typed, and put
// the title back when the component goes away (the cleanup function).
function TitleEditor() {
  const [text, setText] = useState('');

  useEffect(() => {
    const original = document.title;
    document.title = text || original;
    return () => {
      document.title = original; // cleanup: runs before the next effect and on unmount
    };
  }, [text]);

  return (
    <div className="card">
      <label htmlFor="title-text">Type to change the tab title</label>
      <input id="title-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type to change tab title..." />
      <p className="muted">document.title is now: <strong>{text || '(unchanged)'}</strong></p>
    </div>
  );
}

export default TitleEditor;
