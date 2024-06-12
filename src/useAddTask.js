// useAddTask.js
import { useState } from 'react';
import { addTask } from './indexedDB';

const useAddTask = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addNewTask = async (newTaskText) => {
    setIsLoading(true);
    try {
      const id = await addTask({ text: newTaskText, completed: false });
      setIsLoading(false);
      return id;
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return { addNewTask, isLoading };
};

export default useAddTask;
