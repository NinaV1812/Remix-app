import { Form, FormProps } from "@remix-run/react";

type ActionFormProps = Omit<FormProps, "method" | "action" | "onSubmit"> & {
  action?: string;
  method?: "get" | "post";
  buttonText: string;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonType?: "submit" | "reset" | "button";
};
export const ButtonForm = ({
  action,
  method,
  buttonText,
  handleSubmit,
  buttonType,
  ...rest
}: ActionFormProps) => {
  return (
    <Form action={action} method={method} onSubmit={handleSubmit} {...rest}>
      <button type={buttonType}>{buttonText}</button>
    </Form>
  );
};
