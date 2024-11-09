import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

function Task({ task, toggleTask, deleteTask, editTask }) {
  const [newText, setNewText] = useState(task.text);

  // Функция для обновления текста задачи при редактировании
  const handleEditChange = (e) => {
    setNewText(e.target.value);
  };

  // Функция для сохранения изменений при нажатии Enter или потере фокуса
  const handleEditSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      if (newText.trim() !== '') {
        editTask(task.id, newText);
      } else {
        editTask(task.id);
      }
    }
  };

  return (
    <li className={task.completed ? 'completed' : task.editing ? 'editing' : 'active'}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
        <label>
          <span className="description">{task.text}</span>
          <span className="created">created {formatDistanceToNow(new Date(task.createdAt))} ago</span>
        </label>
        <button className="icon icon-edit" onClick={() => editTask(task.id)}></button>
        <button className="icon icon-destroy" onClick={() => deleteTask(task.id)}></button>
      </div>
      {task.editing && <input type="text" className="edit" value={newText} onChange={handleEditChange} onBlur={handleEditSubmit} onKeyDown={handleEditSubmit} autoFocus />}
    </li>
  );
}

export default Task;
