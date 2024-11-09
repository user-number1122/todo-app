// NewTaskForm.js
import React, { useState } from 'react';
function NewTaskForm({ addTask }) {
  const [taskText, setTaskText] = useState(''); // текст новой задачи, введенный пользователем
  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText(''); // Очищаем поле после добавления задачи
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" value={taskText} onChange={(e) => setTaskText(e.target.value)} autoFocus />
      </form>
    </header>
  );
}
export default NewTaskForm; //Это действие предоставляет App.js доступ к компоненту NewTaskForm

/*
import React, { useState, useEffect, useRef } from 'react';

function NewTaskForm({ addTask }) {
  const [taskText, setTaskText] = useState('');

  // Загружаем звук щелчка
  const clickSound = useRef(null);

  // Инициализируем звук при монтировании компонента
  useEffect(() => {
    clickSound.current = new Audio('/sounds/klaviatura.mp3');
  }, []);

  // Воспроизведение звука при вводе символа
  const handleInputChange = (e) => {
    setTaskText(e.target.value);

    if (clickSound.current) {
      clickSound.current.play().catch((error) => {
        console.error('Ошибка воспроизведения звука:', error);
      });
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText(''); // Очищаем поле после добавления задачи
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={taskText}
          onChange={handleInputChange} // Воспроизведение звука при изменении текста
          autoFocus
        />
      </form>
    </header>
  );
}

export default NewTaskForm;
*/
