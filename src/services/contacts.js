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
export const createContact = async (payload) => {
  try {
    const contact = await ContactCollection.create(payload);
    return contact;
  } catch (error) {}
};

export const deleteContact = async (contactId) => {
  try {
    const contact = await ContactCollection.findOneAndDelete({
      _id: contactId,
    });
    return contact;
  } catch (error) {}
};
export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
