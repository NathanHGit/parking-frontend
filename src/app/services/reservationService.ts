import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Retrieves reservation for a specific user.
 * @param {string} user - The user for whom to retrieve reservations.
 * @returns {Promise<any>} A promise that resolves with the reservations for the specified user.
 */
export const getReservationByUser = async (user: string) => {
  try {
    const response = await axios.get(`${apiUrl}/reservations?user=${user}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations by user:", error);
  }
};

/**
 * Adds a reservation for a parking spot.
 * @param {string} user - The user making the reservation.
 * @param {string} spot - The parking spot being reserved.
 * @param {string} email - The email associated with the reservation.
 * @returns {Promise<string>} A promise that resolves with the ID of the added reservation.
 */
export const addReservation = async (
  user: string,
  spot: string,
  email: string
) => {
  try {
    const response = await axios.post(`${apiUrl}/reservations`, {
      user,
      spot,
      date: new Date().toISOString(),
      email,
    });
    return response.data.id;
  } catch (error) {
    console.error("Error adding reservation:", error);
    throw error;
  }
};

/**
 * Deletes a reservation by its ID.
 * @param {string} id - The ID of the reservation to delete.
 */
export const deleteReservation = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}/reservations/${id}`);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};
