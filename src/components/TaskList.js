import React from 'react';
import Task from './Task';
function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask} // Передаем editTask в Task. Передаем функцию для редактирования.
        />
      ))}
    </ul>
  );
}
export default TaskList;
