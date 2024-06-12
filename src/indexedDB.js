import { openDB } from 'idb';

const DB_NAME = 'todoDB';
const STORE_NAME = 'tasks';

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}

export async function getTasks() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function addTask(task) {
  const db = await initDB();
  return db.add(STORE_NAME, task);
}

export async function deleteTask(id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}

export async function updateTask(id, updatedTask) {
  const db = await initDB();
  return db.put(STORE_NAME, { ...updatedTask, id });
}
