import { useEffect, useState } from 'react';

// Friday code challenge: GitHub user lookup.
//   input for a username -> Search -> fetch https://api.github.com/users/{username}
//   show avatar, name, bio, followers, public repos; a loading state; a message for 404;
//   BONUS: abort the previous request when the username changes.
function GitHubLookup() {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState(''); // set when Search is pressed
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController(); // lets the cleanup cancel an old request
    setLoading(true);
    setError(null);
    setUser(null);

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) throw new Error(`No GitHub user called "${username}" (404)`);
        if (res.status === 403 || res.status === 429) throw new Error('GitHub says too many requests right now. Try again in a few minutes.');
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // an old request that was cancelled
        setError(err instanceof TypeError ? 'Network problem: check your connection.' : err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [username]);

  function search(e) {
    e.preventDefault();
    setUsername(input.trim());
  }

  return (
    <div className="card">
      <form className="inline-form" onSubmit={search}>
        <label className="sr-only" htmlFor="gh-user">GitHub username</label>
        <input id="gh-user" value={input} onChange={(e) => setInput(e.target.value)} placeholder="GitHub username, e.g. octocat" />
        <button type="submit">Search</button>
      </form>
      <div aria-live="polite">
        {loading && <p className="muted">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {user && (
          <div className="profile">
            <img src={user.avatar_url} alt="" width="64" height="64" />
            <div>
              <h3>{user.name || user.login}</h3>
              {user.bio && <p>{user.bio}</p>}
              <p className="muted">{user.followers} followers · {user.public_repos} public repos</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.html_url}<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubLookup;
