import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });

  // app.get('/contacts', async (req, res) => {
  //   try {
  //     const contacts = await getAllContacts();
  //     res.status(200).json({
  //       status: 200,
  //       message: 'Successfully found contacts!',
  //       data: contacts,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching all contacts:', error);
  //     res.status(500).json({
  //       message: 'Internal server error',
  //     });
  //   }
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   try {
  //     const contact = await getContactById(contactId);

  //     if (!contact) {
  //       return res.status(404).json({
  //         message: 'Contact not found',
  //       });
  //     }
  //     res.status(200).json({
  //       status: 200,
  //       message: `Successfully found contact with id ${contactId}!`,
  //       data: contact,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching contact:', error);
  //     res.status(500).json({
  //       message: 'Internal server error',
  //     });
  //   }
  // });
  //
  app.use(contactsRouter);
  app.use(errorHandler);
  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
