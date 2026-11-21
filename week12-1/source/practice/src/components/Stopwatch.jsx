import { useEffect, useState } from 'react';

// Study guide, exercise 3 (Friday): a stopwatch. The interval is created inside useEffect and
// cleared in the cleanup function, so it never keeps running after Stop or after unmounting.
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return; // nothing to do while stopped
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // runs when `running` changes and when the component goes away
  }, [running]);

  return (
    <div className="card">
      <p className="big" aria-live="off">{seconds}s</p>
      <div className="buttons">
        <button type="button" onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button type="button" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button type="button" onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
