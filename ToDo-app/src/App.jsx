import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design the perfect dashboard UI', completed: true },
    { id: 2, text: 'Review pull requests', completed: false },
    { id: 3, text: 'Hit the gym at 6:00 PM', completed: false }
  ]);
  const [input, setInput] = useState('');
  
  // Theme state: 'dark' or 'light'
  const [theme, setTheme] = useState('dark');

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // UX Metrics
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    // Dynamic theme class injected here
    <div className={`dashboard-wrapper ${theme}-theme`}>
      {/* Decorative Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="todo-card">
        {/* Header with Stats & Theme Switcher */}
        <header className="todo-header">
          <div>
            <h1>Task Flow</h1>
            <p className="subtitle">Stay organized, stay productive</p>
          </div>
          
          <div className="header-right">
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
              {theme === 'dark' ? (
                // Sun Icon for Dark Mode (Switches to Light)
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.22" x2="5.64" y2="17.86"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                // Moon Icon for Light Mode (Switches to Dark)
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <div className="progress-badge">
              <span className="percentage">{completionPercentage}%</span>
              <span className="label">Done</span>
            </div>
          </div>
        </header>

        {/* Progress Bar UX element */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${completionPercentage}%` }}></div>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={addTask} className="modern-form">
          <input
            type="text"
            placeholder="What's your next focus?..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" aria-label="Add task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </form>

        {/* Premium List Items */}
        <div className="task-container">
          {tasks.length > 0 ? (
            <ul className="premium-list">
              {tasks.map((task) => (
                <li key={task.id} className={task.completed ? 'task-item completed' : 'task-item'}>
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />
                    <span className="custom-checkmark"></span>
                    <span className="task-text">{task.text}</span>
                  </label>
                  
                  <button onClick={() => deleteTask(task.id)} className="action-btn delete" aria-label="Delete task">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <p>All caught up! Time to relax.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;