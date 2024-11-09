// components.Footer.js
import React from 'react';
import TasksFilter from './TasksFilter';

function Footer({ taskCount, clearCompleted, filter, setFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <TasksFilter filter={filter} setFilter={setFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
export default Footer;
