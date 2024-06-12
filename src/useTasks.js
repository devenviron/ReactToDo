// useTasks.js
import { useState, useEffect } from 'react';
import { getTasks } from './indexedDB';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

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

  return tasks;
};

export default useTasks;
