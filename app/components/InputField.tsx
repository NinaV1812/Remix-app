type InputFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputField = ({
  label,
  name,
  defaultValue = "",
  placeholder = "",
  type = "text",
  isTextArea = false,
  id,
  ...rest
}: InputFieldProps) => {
  const inputId = id || `input-${name}`;

  return (
    <label htmlFor={inputId}>
      <span>{label}</span>
      {isTextArea ? (
        <textarea
          id={inputId}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={6}
          data-test={inputId}
          {...rest}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          data-test={inputId}
          {...rest}
        />
      )}
    </label>
  );
};

export default InputField;
