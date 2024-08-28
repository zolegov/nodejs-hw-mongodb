import mongoose from 'mongoose';
import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const data = await ContactCollection.find();
  return data;
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return null;
  }
  const contact = await ContactCollection.findById(contactId).lean();
  return contact;
};
export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
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
