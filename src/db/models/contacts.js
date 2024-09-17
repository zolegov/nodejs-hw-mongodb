import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, default: false },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },

    parentId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
);
export const ContactCollection = model('contacts', contactSchema);
