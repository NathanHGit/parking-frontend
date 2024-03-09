/**
 * Represents the props for the Button component.
 * @typedef {Object} ButtonProps
 * @property {"submit" | "reset" | "button"} [type="button"] - The type of button.
 * @property {string} text - The text displayed on the button.
 * @property {string} color - The color of the button.
 * @property {boolean} [disabled=false] - Indicates if the button is disabled.
 * @property {Function} [onClick] - The function to call when the button is clicked.
 */
interface ButtonProps {
  type?: "submit" | "reset" | "button";
  text: string;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Button component.
 */
function Button({ type, text, color, disabled = false, onClick }: ButtonProps) {
  return (
    <>
      <button
        className={`bg-${color}-500 text-white font-semibold py-2 px-3 rounded text-sm ${
          disabled ? "opacity-50" : `hover:bg-${color}-700`
        }`}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
