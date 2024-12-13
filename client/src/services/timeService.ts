import axios from "axios";
import WORLD_TIME_API_URL from "../consts/apiWorldtime";
/**
 * Fetches the current time in Germany.
 * @returns A promise resolving to the current time as a string.
 */
interface TimeApiResponse {
  datetime: string;
}

export const fetchCurrentTime = async (): Promise<string> => {
  const response = await axios.get<TimeApiResponse>(WORLD_TIME_API_URL);
  if (!response.data || !response.data.datetime) {
    throw new Error("Failed to fetch current time");
  }
  return response.data.datetime;
};
