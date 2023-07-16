import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // Save content to indexedDB. In this example we're using an id of 1 for simplicity.
  // You might need to adjust this if your app requires multiple records in indexedDB.
  await store.put({id: 1, content: content});
  
  await tx.done;
  console.log('Data added to indexedDB.');
}

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get content from indexedDB. Again, we're assuming an id of 1 for simplicity.
  const data = await store.get(1);

  await tx.done;

  // Return the content, or undefined if no content was found.
  return data ? data.content : undefined;
}

initdb();
