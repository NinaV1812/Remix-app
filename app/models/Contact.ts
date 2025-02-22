import { Schema, model } from 'mongoose';

type ContactType = {
    first?: string;
    last?: string;
    avatar?: string;
    twitter?: string;
    notes?: string;
    favorite?: boolean;
    createdAt: Date;
  }
  

const contactSchema = new Schema<ContactType>({
  first: String,
  last: String,
  avatar: String,
  twitter: String,
  notes: String,
  favorite: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export const Contact = model("contacts", contactSchema);
