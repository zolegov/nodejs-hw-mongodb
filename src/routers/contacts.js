import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);
router.get(
  '/',

  ctrlWrapper(getAllContactsController),
);
router.get(
  '/:contactId',

  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',

  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',

  isValidId,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:contactId',

  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);
export default router;
