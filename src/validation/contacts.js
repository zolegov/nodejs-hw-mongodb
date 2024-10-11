import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().allow(false),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string(),
  email: Joi.string().email().allow('').optional(),
  isFavourite: Joi.boolean().allow('false').optional(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.string().optional(),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'photo');
