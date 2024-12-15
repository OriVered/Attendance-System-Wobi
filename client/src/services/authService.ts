import axios from "axios";
import API_ROUTES from "../consts/apiRoutes";
import { AuthResponse } from "../types/authTypes";
import HEADERS from "../consts/headers";
import TEXTS from "../consts/texts";

/**
 * Sends a login request to the backend server.
 *
 * Features:
 * - Sends a POST request with the username and password.
 * - Returns the authentication token, user role, and ID on success.
 *
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<AuthResponse>} A promise resolving to the user's authentication data.
 */
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      API_ROUTES.LOGIN,
      { username, password },
      { headers: HEADERS.JSON }
    );
    return response.data;
  } catch (error) {
    throw new Error(TEXTS.LOGIN.ERROR_MESSAGE);
  }
};

/**
 * Logs out the user by notifying the backend and clearing the token.
 *
 * Features:
 * - Sends a POST request to the logout endpoint.
 * - Requires an authentication token for authorization.
 *
 * @param {string} token - The user's authentication token.
 * @returns {Promise<void>} A promise that resolves when the logout request is complete.
 */
export const logout = async (token: string): Promise<void> => {
  try {
    await axios.post(
      API_ROUTES.LOGOUT,
      {},
      {
        headers: {
          ...HEADERS.JSON,
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error(TEXTS.LOGOUT.ERROR_MESSAGE);
  }
};
