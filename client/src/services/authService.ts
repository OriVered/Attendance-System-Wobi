import axios from "axios";
import API_ROUTES from "../consts/apiRoutes";
import { AuthResponse } from "../types/authTypes";
import HEADERS from "../consts/headers";

/**
 * Sends login request to the backend server.
 */
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(API_ROUTES.LOGIN, { username, password }, { headers: HEADERS.JSON });
  return response.data;
};
