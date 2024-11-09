// components/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // Хранение задач
  const [filter, setFilter] = useState('all'); // Фильтр для задач

  /*
  // Загружаем аудиофайл
  const createSound = new Audio('/sounds/fade-in.mp3');
  const deleteSound = new Audio('/sounds/whoosh-electrical.mp3');
  */

  // Функция для добавления новой задачи
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
      editing: false,
    };
    setTasks([...tasks, newTask]); // Добавление задачи в список
    /*
    // Воспроизведение звука при создании новой задачи
    createSound.play().catch((error) => {
      console.error('Ошибка воспроизведения звука:', error);
    });
    */
  };

  // Функция для переключения статуса выполнения задачи
  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Функция для удаления задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    /*
    // Воспроизведение звука при удалении задачи
    deleteSound.play().catch((error) => {
      console.error('Ошибка воспроизведения звука:', error);
    });
    */
  };

  // Функция для редактирования задачи
  const editTask = (id, newText = null) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText !== null ? newText : task.text,
              editing: !task.editing,
            }
          : task
      )
    );
  };
  /*
  const editTask = (id, newText = null) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText !== null ? newText : task.text, editing: !task.editing } : task)));
  };
*/

  // Функция для очистки выполненных задач
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Фильтрация задач в зависимости от текущего фильтра
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed; // Показываем только активные задачи
    if (filter === 'completed') return task.completed; // Показываем только завершённые задачи
    return true; // Если фильтр не активен, показываем все задачи
  });

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} /> {/* Встраивание и передача функции */}
      <section className="main">
        <TaskList
          tasks={filteredTasks} // передаем отфильтрованный массив задач
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        <Footer taskCount={tasks.filter((task) => !task.completed).length} clearCompleted={clearCompleted} filter={filter} setFilter={setFilter} />
      </section>
    </section>
  );
}

export default App;
