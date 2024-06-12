// useUpdateTask.js
import { useState } from 'react';
import { updateTask } from './indexedDB';

const useUpdateTask = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateTaskById = async (taskId, updatedTaskData) => {
    setIsLoading(true);
    try {
      await updateTask(taskId, updatedTaskData);
      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return { updateTaskById, isLoading };
};

export default useUpdateTask;
