import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
  // We are creating a new database named 'contact_db' which will be using version 1 of the database.
  openDB('contact_db', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which will increment automatically
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    }
  })
};

//get all contact records from contacts table
export const getDb = async () => {
    //create db connection
    const contactDb = await openDB('contact_db', 1);
    //create transaction and specify object store and scope
    const tx = contactDb.transaction('contacts', 'readonly');
    //open the chosen object store
    const store = tx.objectStore('contacts');
    //use getAll method to get all info in the table
    const request = store.getAll();
    //get confirmation of request
    const result = await request;
    console.log('result.value', result);
    return result;
};

//create new record
export const postDb = async (name, email, phone, profile) => {
    const contactDb = await openDB('contact_db', 1);
    //set readwrite as scope to create new records
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.add({ name: name, email: email, phone: phone, profile: profile});
    const result = await request;
    console.log('Data saved to the database', result);
}

//delete record by id
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  //create connection
  const contactDb = await openDB('contact_db', 1);

  //set readwrite as scope to delete a record
  const tx = contactDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');

  //use .delete() method to delete item by id
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}