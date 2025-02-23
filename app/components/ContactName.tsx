import { ContactType } from "../data";

export const ContactName = ({ contact }: { contact: ContactType }) => {
  return contact?.first || contact?.last ? (
    `${contact?.first} ${contact?.last}`
  ) : (
    <i>No Name</i>
  );
};
