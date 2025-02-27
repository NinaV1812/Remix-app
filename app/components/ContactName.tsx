import { ContactType } from "../data";
import { ReactNode } from "react";

type ContactNameProps = {
  contact: ContactType;
};

export const ContactName = ({ contact }: ContactNameProps): ReactNode => {
  const fullName = [contact.first, contact.last].filter(Boolean).join(" ");

  return fullName || <i>No Name</i>;
};
