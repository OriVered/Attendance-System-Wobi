import axios from "axios";
import WORLD_TIME_API_URL from "../consts/apiWorldtime";
import TEXTS from "../consts/texts";

/**
 * Fetches the current time from the World Time API.
 *
 * Features:
 * - Sends a GET request to retrieve the current time.
 * - Parses the response to extract the datetime value.
 *
 * @returns {Promise<string>} A promise resolving to the current time as a string.
 * @throws {Error} Throws a localized error message if the API response does not contain a valid datetime value.
 */
interface TimeApiResponse {
  datetime: string; // The datetime string format
}

export const fetchCurrentTime = async (): Promise<string> => {
  try {
    const response = await axios.get<TimeApiResponse>(WORLD_TIME_API_URL);

    // Validate the response
    if (!response.data || !response.data.datetime) {
      throw new Error(TEXTS.CLOCK_LAYOUT.ERROR_MESSAGE);
    }

    return response.data.datetime;
  } catch (error) {
    throw new Error(TEXTS.CLOCK_LAYOUT.ERROR_MESSAGE); 
  }
};
