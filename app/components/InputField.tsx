type InputFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  ariaLabel?: string;
  isTextArea?: boolean;
};

const InputField = ({
  label,
  name,
  defaultValue = "",
  placeholder = "",
  type = "text",
  ariaLabel,
  isTextArea = false,
}: InputFieldProps) => {
  return (
    <label>
      <span>{label}</span>
      {isTextArea ? (
        <textarea defaultValue={defaultValue} name={name} rows={6} />
      ) : (
        <>
          <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-label={ariaLabel || label}
          />
        </>
      )}
    </label>
  );
};

export default InputField;
