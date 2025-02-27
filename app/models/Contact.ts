import { Schema, model } from 'mongoose';
import { ContactType } from '../data';

const contactSchema = new Schema<ContactType>({
  first: String,
  last: String,
  avatar: String,
  twitter: String,
  notes: String,
  favorite: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export const Contact = model("contact", contactSchema, "contacts");
