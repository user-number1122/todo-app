//components.Task.js
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

function Task({ task, toggleTask, deleteTask, editTask }) {
  const [newText, setNewText] = useState(task.text); // Хранение нового текста для редактирования

  /*
  // Добавляем аудио
  const saveSound = new Audio('/sounds/crystal.mp3'); // Путь к вашему аудиофайлу
*/
  // Функция для обновления текста задачи при редактировании
  const handleEditChange = (e) => {
    setNewText(e.target.value); // Обновляем состояние с новым текстом
  };

  // Функция для сохранения изменений при нажатии Enter или потере фокуса
  const handleEditSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      // Проверяем, что текст не пустой
      if (newText.trim() !== '') {
        // Если текст не пустой, сохраняем его
        editTask(task.id, newText);
      } else {
        // Если текст пустой, просто выходим из режима редактирования, сохраняя старый текст
        editTask(task.id);
      }
    }
  };
  /*
  // Функция для сохранения изменений при нажатии Enter или потере фокуса
  const handleEditSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      // Сохраняем при нажатии Enter или при потере фокуса
      editTask(task.id, newText); // Передаем новый текст в editTask для обновления
      
      // Воспроизведение звука после сохранения
      saveSound.play().catch((error) => {
        console.error('Ошибка воспроизведения звука:', error);
      });
    }
  };
  */

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
      {task.editing && (
        <input
          type="text"
          className="edit"
          value={newText} // Значение берется из состояния
          onChange={handleEditChange} // Обработка изменений текста
          onBlur={handleEditSubmit} // Сохранение при потере фокуса
          onKeyDown={handleEditSubmit} // Сохранение при нажатии Enter
          autoFocus
        />
      )}
    </li>
  );
}

export default Task;
