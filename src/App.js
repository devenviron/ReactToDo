import React, { useState, useEffect } from 'react';
import './App.css';
import { getTasks, addTask, deleteTask, updateTask } from './indexedDB';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromDB = await getTasks();
        setTasks(tasksFromDB);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
        // Показать пользователю сообщение об ошибке
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      if (newTask.trim()) {
        const id = await addTask({ text: newTask.trim(), completed: false });
        setTasks([...tasks, { text: newTask.trim(), completed: false, id }]);
        setNewTask('');
      }
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      // Показать пользователю сообщение об ошибке
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      // Показать пользователю сообщение об ошибке
    }
  };

  const handleToggleTaskCompletion = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      await updateTask(id, updatedTask);
      setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Ошибка при обновлении статуса задачи:", error);
      // Показать пользователю сообщение об ошибке
    }
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setIsEditing(true);
    setCurrentTaskId(id);
    setNewTask(taskToEdit.text);
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = { text: newTask.trim(), completed: tasks.find(task => task.id === currentTaskId).completed };
      await updateTask(currentTaskId, updatedTask);
      setTasks(tasks.map(task => (task.id === currentTaskId ? { ...updatedTask, id: currentTaskId } : task)));
      setIsEditing(false);
      setNewTask('');
      setCurrentTaskId(null);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      // Показать пользователю сообщение об ошибке
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isEditing) {
        handleUpdateTask();
      } else {
        handleAddTask();
      }
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New Task"
        />
        {isEditing ? (
          <button onClick={handleUpdateTask}>Update Task</button>
        ) : (
          <button onClick={handleAddTask}>Add Task</button>
        )}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={() => handleToggleTaskCompletion(task.id)}
              >
                {task.text}
              </span>
              <div className="task-buttons">
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
