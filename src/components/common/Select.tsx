/**
 * Props for the Select component.
 * @typedef {Object} SelectProps
 * @property {string} [id] - The ID of the select element.
 * @property {number} [value] - The selected value of the select element.
 * @property {any[]} options - An array of options for the select element.
 * @property {(e: any) => void} [onChange] - Event handler for select change.
 */
interface SelectProps {
  id?: string;
  value?: number;
  options: any[];
  onChange?: (e: any) => void;
}

/**
 * Select component.
 */
function Select({ id, value, options, onChange }: SelectProps) {
  return (
    <>
      <div className="relative">
        <select
          id={id}
          className="text-sm border rounded p-1.5 pr-6 focus:outline-none focus:shadow-outline focus:border-gray-400 appearance-none"
          value={value}
          onChange={onChange}
        >
          <option value={-1}>Tous</option>
          {options.map((option: any) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.text ?? option}
            </option>
          ))}
        </select>
        <div className="absolute top-1/2 -translate-y-1/2 right-1.5 pointer-events-none ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="15px"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Select;
