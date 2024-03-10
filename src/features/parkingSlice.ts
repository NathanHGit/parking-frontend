import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for the Parking state.
 * @typedef {Object} ParkingState
 * @property {Spot[]} spots - The array of parking spots.
 * @property {number[]} floors - The array of available floor numbers.
 */
interface ParkingState {
  spots: Spot[];
  floors: number[];
}

const initialState: ParkingState = {
  spots: [],
  floors: [],
};

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {
    /**
     * Reducer to set the parking spots and update the available floors.
     * @param {ParkingState} state - The current state.
     * @param {PayloadAction<Spot[]>} action - The action containing the new parking spots.
     */
    setParkingSpots(state, action: PayloadAction<Spot[]>) {
      if (!action.payload) return;
      state.spots = action.payload;
      state.floors = [...new Set(state.spots.map((spot) => spot.floor))].sort();
    },
    /**
     * Reducer to toggle the state of a parking spot (occupied/free).
     * @param {ParkingState} state - The current state.
     * @param {PayloadAction<any>} action - The action containing the spot to change.
     */
    changeSpotState(state, action: PayloadAction<any>) {
      const spot = state.spots.find(
        (spot) => spot.number === action.payload.spot.number
      );
      if (spot) spot.occupied = !spot.occupied;
    },
  },
});

export const { setParkingSpots, changeSpotState } = parkingSlice.actions;

export default parkingSlice.reducer;
