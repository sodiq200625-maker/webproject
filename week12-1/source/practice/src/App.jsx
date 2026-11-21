import CounterWithHistory from './components/CounterWithHistory.jsx';
import ShoppingCounter from './components/ShoppingCounter.jsx';
import ToggleDetail from './components/ToggleDetail.jsx';
import TaskList from './components/TaskList.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import { WordCount, CharCountEffect } from './components/WordCount.jsx';
import GitHubLookup from './components/GitHubLookup.jsx';
import TitleEditor from './components/TitleEditor.jsx';
import FetchUser from './components/FetchUser.jsx';
import Stopwatch from './components/Stopwatch.jsx';

// One entry per exercise. `from` says where in the course material it came from.
export const demos = [
  { id: 'counter-history', group: 'Monday · useState', from: 'Monday code challenge', title: 'Counter with history', Demo: CounterWithHistory,
    note: 'Two state variables: count and history. +1, -1 and Reset add to the history (last 5 values); Undo goes back one step.' },
  { id: 'shopping-counter', group: 'Monday · useState', from: 'Monday video lecture challenge', title: 'Shopping cart counter', Demo: ShoppingCounter,
    note: 'Quantities live in one object (item id → quantity). They cannot go below 0, and the total is worked out while rendering.' },
  { id: 'toggle', group: 'Monday · useState', from: 'Monday study guide · Exercise 1', title: 'Toggle visibility', Demo: ToggleDetail,
    note: 'Boolean state flips a paragraph on and off.' },
  { id: 'task-list', group: 'Monday · useState', from: 'Monday study guide · Exercise 2', title: 'Add and remove items', Demo: TaskList,
    note: 'Array state that is never changed in place: spread to add, filter to remove.' },
  { id: 'scoreboard', group: 'Monday · useState', from: 'Monday study guide · Exercise 3', title: 'Lifting state up: ScoreBoard', Demo: ScoreBoard,
    note: 'The parent owns both scores and passes each child its value and callbacks, so it can show the total.' },
  { id: 'word-count', group: 'Monday · useState', from: 'Monday “next practice”', title: 'Live word count', Demo: WordCount,
    note: 'Only the text is state; the word count is calculated while rendering.' },
  { id: 'github-lookup', group: 'Friday · useEffect', from: 'Friday code challenge', title: 'GitHub user lookup', Demo: GitHubLookup,
    note: 'Fetches api.github.com/users/{name} on Search, with loading and 404 states, and aborts the previous request (bonus). Try “octocat” or “muxiddin19”.' },
  { id: 'title-sync', group: 'Friday · useEffect', from: 'Friday study guide · Exercise 1', title: 'Page title sync', Demo: TitleEditor,
    note: 'An effect sets document.title; its cleanup puts the old title back.' },
  { id: 'fetch-user', group: 'Friday · useEffect', from: 'Friday study guide · Exercise 2', title: 'Fetch a user on mount', Demo: FetchUser,
    note: 'An empty dependency array runs the effect once. Loading, error and data are separate state.' },
  { id: 'stopwatch', group: 'Friday · useEffect', from: 'Friday study guide · Exercise 3', title: 'Stopwatch with cleanup', Demo: Stopwatch,
    note: 'setInterval is created in an effect and cleared in its cleanup.' },
  { id: 'char-count', group: 'Friday · useEffect', from: 'Friday “next practice”', title: 'Live character count with useEffect', Demo: CharCountEffect,
    note: 'Done with an effect as the practice asks, although plain text.length would be enough.' },
];

// `?demo=<id>` shows just that one demo with no page chrome. The Week 12 page embeds each
// exercise this way, next to its code.
const only = new URLSearchParams(window.location.search).get('demo');
if (only) document.documentElement.classList.add('embed');

function Section({ demo }) {
  const { id, from, title, note, Demo } = demo;
  if (only) return only === id ? <div className="demo"><Demo /></div> : null;
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <p className="from">{from}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <p className="note">{note}</p>
      <div className="demo"><Demo /></div>
    </section>
  );
}

function App() {
  return (
    <>
      {!only && (
        <header className="page-head">
          <p className="eyebrow">K0126002 · Week 12 · State and effects</p>
          <h1>
            Class <span className="marker">practice</span>
          </h1>
          <p className="lead">
            The exercises from the Monday class (useState) and the Friday class (useEffect), each one a small
            component in its own file.
          </p>
          <nav className="toc" aria-label="Exercises on this page">
            {demos.map((d) => (
              <a key={d.id} href={`#${d.id}`}>{d.title}</a>
            ))}
          </nav>
        </header>
      )}
      {demos.map((d) => (
        <Section key={d.id} demo={d} />
      ))}
    </>
  );
}

export default App;
