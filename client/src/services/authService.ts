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

/**
 * Logs out the user by clearing the token from localStorage.
 */
export const logout = async (token: string): Promise<void> => {
  try {

    // Notify the backend (optional)
    await axios.post(API_ROUTES.LOGOUT, {}, { 
      headers: { 
        ...HEADERS.JSON,
        Authorization: `Bearer ${token}`
      }
    });

  } catch (error) {
    console.error("Error during logout:", error);
  }
};
