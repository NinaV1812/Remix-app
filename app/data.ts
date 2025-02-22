////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { Contact } from "./models/Contact";
import { connectDB } from "./db";
import * as mongoose from 'mongoose';

connectDB(); // Ensure DB connection

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  _id: string;
  createdAt: string;
};

type ContactType = {
  _id: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  createdAt: Date;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
export const getAll = async (): Promise<ContactType[]> => {
  try {
    //TODO Fix sorting by date
    const contacts = await Contact.find({}).sort({ createdAt: -1, last: 1 });
    // console.log('contacts', contacts)
    return contacts;
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};

export const getContact = async (id: string): Promise<ContactType> => {
  // export async function getContact(id: string) {
  try {
    return await Contact.findById(id);
  } catch (error) {
    throw new Error("Failed to fetch contacts");
  }
};

// export async function updateContact(id: string, updates: ContactMutation) {
export const updateContact = async (id: string, updates: ContactMutation) => {
  try {
    const createdAt = new Date().toISOString();
    const newContact = { createdAt, ...updates };
    const updatedContact = await Contact.findByIdAndUpdate(id, newContact, {
      new: true,
    });
    console.log("updatedProfile", updatedContact);
    invariant(updatedContact, `No contact found for ${id}`);

    return updatedContact;
  } catch (error) {
    throw new Error(`No contact found for ${error}`);
  }
};

export const deleteContact = async (id: string) => {
  try {
    await Contact.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`No contact found for ${error}`);
  }
};

export async function createEmptyContact() {
  try {
       
    const createdProfile = await Contact.create({});
    const profile = await createdProfile.save();
    return profile;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error(`Bad request ${error}`);
    }
  }
}

// const fakeContacts = {
//   records: {} as Record<string, ContactRecord>,

//   // async getAll(): Promise<ContactRecord[]> {
//   //   return Object.keys(fakeContacts.records)
//   //     .map((key) => fakeContacts.records[key])
//   //     .sort(sortBy("-createdAt", "last"));
//   // },

//   async get(id: string): Promise<ContactRecord | null> {
//     return fakeContacts.records[id] || null;
//   },

//   async create(values: ContactMutation): Promise<ContactRecord> {
//     const id = values.id || Math.random().toString(36).substring(2, 9);
//     const createdAt = new Date().toISOString();
//     const newContact = { id, createdAt, ...values };
//     fakeContacts.records[id] = newContact;
//     return newContact;
//   },

//   async set(id: string, values: ContactMutation): Promise<ContactRecord> {
//     const contact = await fakeContacts.get(id);
//     invariant(contact, `No contact found for ${id}`);
//     const updatedContact = { ...contact, ...values };
//     fakeContacts.records[id] = updatedContact;
//     return updatedContact;
//   },

//   destroy(id: string): null {
//     delete fakeContacts.records[id];
//     return null;
//   },
// };

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
// export async function getContacts(query?: string | null) {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   let contacts = await fakeContacts.getAll();
//   if (query) {
//     contacts = matchSorter(contacts, query, {
//       keys: ["first", "last"],
//     });
//   }
//   return contacts.sort(sortBy("last", "createdAt"));
// }
export async function getContacts(query?: string | null) {
  let contacts = await getAll(); // Fetch all contacts from DB
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

// export async function createEmptyContact() {
//   const contact = await fakeContacts.create({});
//   return contact;
// }

// export async function getContact(id: string) {
//   return fakeContacts.get(id);
// }

// export async function updateContact(id: string, updates: ContactMutation) {
//   const contact = await fakeContacts.get(id);
//   if (!contact) {
//     throw new Error(`No contact found for ${id}`);
//   }
//   await fakeContacts.set(id, { ...contact, ...updates });
//   return contact;
// }

// export async function deleteContact(id: string) {
//   fakeContacts.destroy(id);
// }
