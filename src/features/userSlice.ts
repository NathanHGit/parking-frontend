import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

/**
 * Interface for the user state.
 * @typedef {Object} UserState
 * @property {string} id - The user's ID.
 * @property {Reservation | null} reservation - The user's reservation information.
 */
interface UserState {
  id: string;
  reservation: Reservation | null;
}

/**
 * Interface for a reservation.
 * @typedef {Object} Reservation
 * @property {string} id - The reservation ID.
 * @property {string} user - The user's ID.
 * @property {Spot} spot - The reserved parking spot.
 * @property {string} date - The date of the reservation.
 * @property {string} email - The user's email associated with the reservation.
 */
interface Reservation {
  id: string;
  user: string;
  spot: Spot;
  date: string;
  email: string;
}

const initialState: UserState = {
  id: "",
  reservation: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Reducer to set the user's ID.
     * @param {UserState} state - The current state.
     * @param {PayloadAction<string>} action - The action containing the user's ID.
     */
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    /**
     * Reducer to set or clear the user's reservation.
     * @param {UserState} state - The current state.
     * @param {PayloadAction<any>} action - The action containing the reservation information.
     */
    setReservation: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        const reservation: Reservation = {
          id: action.payload._id,
          user: state.id,
          spot: action.payload.spot,
          date: new Date().toISOString(),
          email: action.payload.email,
        };
        state.reservation = reservation;
      } else {
        state.reservation = null;
      }
    },
  },
});

export const { setUserId, setReservation } = userSlice.actions;

/**
 * Selector function to retrieve the user state.
 * @param {RootState} state - The root state of the Redux store.
 * @returns {UserState} The user state.
 */
export const selectUser = (state: RootState) => state.user;

/**
 * Selector function to format the reservation date.
 * @param {RootState} state - The root state of the Redux store.
 * @returns {string | null} The formatted date string or null if no reservation exists.
 */
export const selectFormattedDate = (state: RootState) => {
  const date = state.user?.reservation?.date;
  if (date) {
    const formattedDate = `Le ${new Date(
      date
    ).toLocaleDateString()} à ${new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })}`;

    return formattedDate;
  }
  return null;
};

export default userSlice.reducer;
