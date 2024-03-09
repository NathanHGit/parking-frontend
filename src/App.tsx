import { useDispatch } from "react-redux";
import Parking from "./components/Parking";
import { setReservation, setUserId } from "./features/userSlice";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getReservationByUser } from "./app/services/reservationService";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

/**
 * App component.
 * Manages simulated user authentication and initializes necessary data.
 */
function App() {
  const dispatch = useDispatch();

  /**
   * Initialize user data on application load.
   * Fetches reservation data for the user if available.
   * Sets the user ID and reservation in the Redux store.
   * @param {string} storedUserId - The user ID stored in local storage.
   */
  const initUser = async (storedUserId: string) => {
    const reservation = await getReservationByUser(storedUserId);
    console.log(reservation);

    if (reservation) dispatch(setReservation(reservation));
  };
  useEffect(() => {
    // Check if the user ID is stored in local storage
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      // If no user ID is found, generate a new one
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    } else {
      // If user ID exists, initialize user data
      initUser(storedUserId);
    }
    // Set the user ID in the Redux store
    dispatch(setUserId(storedUserId));
  }, [dispatch]);

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Parking name="Parking Courier" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
