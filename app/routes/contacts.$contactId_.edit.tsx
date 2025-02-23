import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact } from "../data";
import InputField from "../components/InputField";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form key={contact._id} id="contact-form" method="post">
      <p>
        <InputField
          label="First Name"
          name="first"
          defaultValue={contact.first}
          placeholder="First"
        />
        <InputField
          label="Last Name"
          name="last"
          defaultValue={contact.last}
          placeholder="Last"
        />
      </p>
      <InputField
        label="Twitter"
        name="twitter"
        defaultValue={contact.twitter}
        placeholder="@jack"
      />
      <InputField
        label="Avatar URL"
        name="avatar"
        defaultValue={contact.avatar}
        placeholder="https://example.com/avatar.jpg"
      />
      <InputField
        label="Notes"
        name="notes"
        defaultValue={contact.notes}
        isTextArea
      />
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}
