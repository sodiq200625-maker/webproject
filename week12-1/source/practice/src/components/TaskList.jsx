import { useState } from 'react';

// Study guide, exercise 2: add and remove items from a list.
// The array is never changed in place: [...prev, item] adds, filter() removes.
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: input.trim() }]);
    setInput('');
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="card">
      <form className="inline-form" onSubmit={addTask}>
        <label className="sr-only" htmlFor="new-task">New task</label>
        <input id="new-task" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New task" />
        <button type="submit">Add</button>
      </form>
      {tasks.length === 0 ? (
        <p className="muted">No tasks yet. Add one above.</p>
      ) : (
        <ul className="plain-list">
          {tasks.map((task) => (
            <li key={task.id} className="line">
              <span>{task.text}</span>
              <button type="button" className="small" aria-label={`Remove ${task.text}`} onClick={() => removeTask(task.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
