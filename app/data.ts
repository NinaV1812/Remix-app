import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import { Contact } from "./models/Contact";
import { connectDB } from "./db";
import * as mongoose from "mongoose";

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

export type ContactType = {
  _id: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  createdAt: string | Date;
};

export const getAll = async (): Promise<ContactType[]> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1, last: 1 });

    if (contacts.length === 0) {
      console.log("No contacts found.");
    }

    // TODO Refactor
    return contacts.map((contact) => {
      const { _id, createdAt, ...rest } = contact.toObject();
      return {
        ...rest,
        _id: _id.toString(),
        createdAt: new Date(createdAt),
      };
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);

    throw new Error("Failed to fetch contacts");
  }
};

export const getContact = async (id: string): Promise<ContactType> => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      console.error(`Contact not found for ID: ${id}`);
      throw new Error(`No contact found for ID ${id}`);
    }
    //TODO Refactor
    return {
      ...contact.toObject(),
      _id: contact._id.toString(),
      createdAt: new Date(contact.createdAt),
    };
  } catch (error) {
    console.error("Error retrieving contact:", error);

    if (error instanceof Error && error.message.includes("No contact found")) {
      throw new Response("Contact not found", { status: 404 });
    }

    throw new Response("Internal Server Error", { status: 500 });
  }
};

export const updateContact = async (id: string, updates: ContactMutation) => {
  try {
    const createdAt = new Date().toISOString();
    const newContact = { createdAt, ...updates };
    const updatedContact = await Contact.findByIdAndUpdate(id, newContact, {
      new: true,
    });
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

export async function getContacts(query?: string | null) {
  let contacts = await getAll();

  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}
