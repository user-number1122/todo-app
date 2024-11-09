import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(savedTasks); // Хранение задач
  const [filter, setFilter] = useState('all'); // Фильтр для задач

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // Это сработает каждый раз, когда tasks изменяются

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
  };

  // Функция для переключения статуса выполнения задачи
  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Функция для удаления задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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

  // Функция для очистки выполненных задач
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Фильтрация задач в зависимости от текущего фильтра
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed; // Показываем только активные задачи
    if (filter === 'completed') return task.completed; // Показываем только завершённые задачи
    return true;
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
