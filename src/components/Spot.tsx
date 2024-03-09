import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { selectUser } from "../features/userSlice";

/**
 * Props for the Spot component.
 * @typedef {Object} SpotProps
 * @property {string} number - The number of the parking spot.
 * @property {number} floor - The floor of the parking spot.
 * @property {boolean} occupied - Whether the parking spot is occupied.
 * @property {(action: "book" | "cancel") => void} openModal - Function to open the modal for booking the spot or canceling the reservation.
 */
interface SpotProps {
  number: string;
  floor: number;
  occupied: boolean;
  openModal: (action: "book" | "cancel") => void;
}

/**
 * Gets the status of the parking spot.
 * @param {boolean} occupied - Whether the parking spot is occupied.
 * @param {Object} user - The current user.
 * @param {string} number - The number of the parking spot.
 * @returns {Object} - Object containing the title and color of the status.
 */
function getStatus(occupied: boolean, user: any, number: string) {
  if (!occupied) {
    return { title: "Libre", color: "emerald" };
  } else if (user.reservation?.spot.number === number) {
    return { title: "Réservé", color: "sky" };
  } else {
    return { title: "Occupé", color: "red" };
  }
}

/**
 * Spot component.
 */
function Spot({ number, floor, occupied, openModal }: SpotProps) {
  const user = useSelector((state: RootState) => selectUser(state));
  const status = getStatus(occupied, user, number);

  return (
    <tr className="even:bg-slate-50">
      <td className="px-4 py-2 text-sm text-center">{number}</td>
      <td className="px-4 py-2 text-sm text-center">{floor}</td>
      <td className="px-4 py-2 flex justify-center">
        <span
          className={`text-xs bg-${status.color}-500
          text-white
          font-semibold
          py-1
          px-2
          rounded`}
        >
          {status.title}
        </span>
      </td>
      <td className="text-sm text-center px-2 md:px-4">
        {!occupied && !user.reservation ? (
          <button onClick={() => openModal("book")} className="hover:underline">
            Réserver
          </button>
        ) : null}
      </td>
    </tr>
  );
}

export default Spot;
