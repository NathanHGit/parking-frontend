/**
 * Props for the Input component.
 * @typedef {Object} InputProps
 * @property {string} [id] - The ID of the input element.
 * @property {"text" | "email"} type - The type of the input element.
 * @property {string} [value] - The value of the input element.
 * @property {string} placeholder - The placeholder text of the input element.
 * @property {string} width - The width of the input element.
 * @property {boolean} [required] - Indicates whether the input is required.
 * @property {(e: any) => void} [onChange] - Event handler for input change.
 */
interface InputProps {
  id?: string;
  type: "text" | "email";
  value?: string;
  placeholder: string;
  width: string;
  required?: boolean;
  onChange?: (e: any) => void;
}

/**
 * Input component.
 */
function Input({
  id,
  type,
  value,
  placeholder,
  width,
  required,
  onChange,
}: InputProps) {
  return (
    <>
      <input
        id={id}
        type={type}
        value={value}
        className={
          "text-sm p-1.5 rounded indent-1 border focus:outline-none focus:shadow-outline focus:border-gray-400 caret-gray-400 " +
          width
        }
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
