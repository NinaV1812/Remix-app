import invariant from "tiny-invariant";
import { Contact } from "./models/Contact";
import { connectDB } from "./db";
import { Types, Error } from "mongoose";

connectDB(); // Ensure DB connection

export type ContactType = {
  _id?: Types.ObjectId;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  createdAt?: string | Date;
};

export const getContact = async (id: string): Promise<ContactType> => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      console.error(`Contact not found for ID: ${id}`);
      throw new Error(`No contact found for ID ${id}`);
    }
    return contact;
  } catch (error) {
    console.log("Error retrieving contact:", error);
  }
};

export const updateContact = async (id: string, updates: ContactType) => {
  try {
    console.log("contactUpdates", updates);

    const updatedContact = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
    });

    invariant(updatedContact, `No contact found for ${updatedContact._id}`);

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
    if (error instanceof Error.ValidationError) {
      throw new Error(`Bad request ${error}`);
    }
  }
}

export const getContacts = async (query?: string): Promise<ContactType[]> => {
  try {
    if (query === null) {
      query = ".*";
    }
    const contacts = await Contact.find({
      $or: [
        { first: new RegExp(query, "i") },
        { last: new RegExp(query, "i") },
      ],
    }).sort({ last: 1, createAt: -1 });

    return contacts;
  } catch (error) {
    throw new Error("Failed to fetch contacts. Please try again later.");
  }
};
