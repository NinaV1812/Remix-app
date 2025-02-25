import { ContactType } from "../data";

interface ContactNameProps {
  contact: ContactType;
}

export const ContactName = ({ contact }: ContactNameProps) => {
  const fullName = [contact.first, contact.last].filter(Boolean).join(" ");

  return fullName || <i>No Name</i>;
};
