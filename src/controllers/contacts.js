import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Student not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
export const createContactController = async (req, res) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error created contact:', error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const payload = req.body;

  try {
    const updatedContact = await updateContact(contactId, payload);
    if (!updatedContact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact.contact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};
