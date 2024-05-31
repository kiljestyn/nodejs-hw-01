import fs from 'fs/promises';
import { createFakeContact } from '../utils/createFakeContact.js';
import { PATH_DB } from '../constants/contacts.js';

export const addOneContact = async () => {
  try {
    const db = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(db);
    const newContact = createFakeContact();
    contacts.push(newContact);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error reading db.json:', error);
      return;
    }
  }
};

await addOneContact();
