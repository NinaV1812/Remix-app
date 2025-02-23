import { Form } from "@remix-run/react";

const CreateContactForm = () => {
  return (
    <Form method="post" id="create-new-contact">
      <button type="submit">New</button>
    </Form>
  );
};

export default CreateContactForm;
