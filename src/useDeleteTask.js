// useDeleteTask.js
import { useState } from 'react';
import { deleteTask } from './indexedDB';

const useDeleteTask = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTaskById = async (taskId) => {
    setIsLoading(true);
    try {
      await deleteTask(taskId);
      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return { deleteTaskById, isLoading };
};

export default useDeleteTask;
