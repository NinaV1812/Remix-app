import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getContact, updateContact } from "../data";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Favorite } from "../components/Favorite";
import { ButtonForm } from "../components/ButtonForm";
import { FormEvent } from "react";
import { ContactName } from "../components/ContactName";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  // if (!contact) {
  //   console.log('IN NO CONTACT')
  //   return new Response("Not Foundfff", { status: 408 });
  // }
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  const onSubmitDeleteForm = (event: FormEvent<HTMLFormElement>) => {
    const response = confirm("Please confirm you want to delete this record.");
    if (!response) {
      event.preventDefault();
    }
  };
  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          <ContactName contact={contact} />
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <ButtonForm action="edit" buttonType="submit" buttonText="Edit" data-test="edit-contact"/>

          <ButtonForm
            action="destroy"
            method="post"
            buttonText={"Delete"}
            handleSubmit={(event) => onSubmitDeleteForm(event)}
            buttonType={"submit"}
          />
        </div>
      </div>
    </div>
  );
}
