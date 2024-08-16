import mongoose from 'mongoose';
import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const data = await ContactCollection.find();
  return data;
};

export const getContactById = async (contactId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return null; // Повертаємо null, якщо ID невалідний
    }
    const contact = await ContactCollection.findById(contactId).lean();
    return contact;
  } catch (error) {
    console.error('Error in getContactById:', error);
    throw error;
  }
};
