// App.js
import React, { useState } from 'react';
import './App.css';
import useTasks from './useTasks';
import useAddTask from './useAddTask';
import useDeleteTask from './useDeleteTask';
import useUpdateTask from './useUpdateTask';

function App() {
  const tasks = useTasks();
  const { addNewTask, isLoading: isAddingTask } = useAddTask();
  const { deleteTaskById, isLoading: isDeletingTask } = useDeleteTask();
  const { updateTaskById, isLoading: isUpdatingTask } = useUpdateTask();
  const [newTaskText, setNewTaskText] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;
    try {
      const id = await addNewTask(newTaskText.trim());
      setNewTaskText('');
      console.log('New task added with id:', id);
    } catch (error) {
      console.error('Error adding new task:', error);
      // Handle error, show user feedback
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      console.log('Task deleted with id:', taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error, show user feedback
    }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    const updatedTaskData = { ...taskToUpdate, completed: !taskToUpdate.completed };
    try {
      await updateTaskById(taskId, updatedTaskData);
      console.log('Task updated with id:', taskId);
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error, show user feedback
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setCurrentTaskId(taskId);
    setNewTaskText(taskToEdit.text);
    setIsEditing(true);
  };

  const handleUpdateTask = async () => {
    if (!newTaskText.trim()) return;
    const updatedTaskData = { text: newTaskText.trim(), completed: tasks.find(task => task.id === currentTaskId).completed };
    try {
      await updateTaskById(currentTaskId, updatedTaskData);
      setNewTaskText('');
      setCurrentTaskId(null);
      setIsEditing(false);
      console.log('Task updated with id:', currentTaskId);
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error, show user feedback
    }
  };

  const handleKeyDown = (e) => {
    console.log("Key pressed:", e.key);
    console.log("isEditing:", isEditing);
    if (e.key === 'Enter') {
      console.log("Enter key pressed");
      if (isEditing) {
        console.log("Editing task...");
        handleUpdateTask();
      } else {
        console.log("Adding task...");
        handleAddTask();
      }
    }
  };

  // Возвращаемый JSX компонента будет размещен здесь
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="New Task"
        />
        {isEditing ? (
          <button disabled={isUpdatingTask} onClick={handleUpdateTask}>Update Task</button>
        ) : (
          <button disabled={isAddingTask} onClick={handleAddTask}>Add Task</button>
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
                <button disabled={isDeletingTask} onClick={() => handleDeleteTask(task.id)}>Delete</button>
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
