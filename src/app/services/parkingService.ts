import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Fetches parking data from the server.
 * @returns {Promise<any>} A promise that resolves with the fetched parking data.
 */
export const fetchParkingData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/parking`);
    return response.data;
  } catch (error) {
    console.error("Error fetching parking data:", error);
  }
};

/**
 * Updates the state of a parking spot.
 * @param {object} params - The parameters for updating the parking spot state.
 * @param {string} params._id - The ID of the parking spot to update.
 * @param {boolean} params.occupied - The new occupancy state of the parking spot.
 */
export const updateParkingSpotState = async ({ _id, occupied }: any) => {
  try {
    await axios.patch(`${apiUrl}/parking/${_id}`, {
      occupied: !occupied,
    });
  } catch (error) {
    console.error("Error updating parking spot state:", error);
  }
};
