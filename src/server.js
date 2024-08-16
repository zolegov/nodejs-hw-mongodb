// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import { env } from './utils/env.js';
// import { getAllContacts, getContactById } from './services/contacts.js';

// const PORT = Number(env('PORT', '3000'));

// export const setupServer = () => {
//   const app = express();

//   app.use(express.json());
//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );
//   app.use(cors());

//   app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello world',
//     });
//   });

//   app.get('/contacts', async (req, res) => {
//     const contacts = await getAllContacts();
//     res.status(200).json({
//       data: contacts,
//     });
//   });

//   app.get('/contacts/:contactId', async (req, res) => {
//     const { contactId } = req.params;

//     try {
//       const contact = await getContactById(contactId);
//       if (!contact) {
//         // Якщо контакт не знайдено, повертаємо статус 404 без підняття виключення
//         return res.status(404).json({
//           message: 'Contact not found',
//         });
//       }
//       res.status(200).json({
//         status: 200,
//         message: `Successfully found contact with id ${contactId}!`,
//         data: contact,
//       });
//     } catch (error) {
//       // Інші помилки все ще обробляємо через middleware для обробки помилок
//       res.status(500).json({
//         message: 'Something went wrong',
//       });
//     }
//   });

//   app.use('*', (req, res) => {
//     res.status(404).json({
//       message: 'Not found',
//     });
//   });

//   app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
//   });
// };

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

  app.get('/contacts', async (req, res) => {
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
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
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
  });
  //
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
