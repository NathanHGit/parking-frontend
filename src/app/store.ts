import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import parkingReducer from "../features/parkingSlice";

/**
 * Creates a Redux store with combined reducers.
 * @returns {Object} The Redux store instance.
 */
const store = configureStore({
  reducer: {
    user: userReducer,
    parking: parkingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
