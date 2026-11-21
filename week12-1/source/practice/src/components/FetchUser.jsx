import { useEffect, useState } from 'react';

// Study guide, exercise 2 (Friday): fetch a user when the component first appears, with the
// usual three pieces of state: the data, a loading flag and an error.
function FetchUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchUser() {
      // the async function is defined inside the effect (an effect callback cannot be async itself)
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch');
        setUser(await res.json());
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    fetchUser();
    return () => controller.abort();
  }, []); // empty array: run once, on mount

  return (
    <div className="card" aria-live="polite">
      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {user && (
        <>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}

export default FetchUser;
