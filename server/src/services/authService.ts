import { User } from "../models/userModel";
import { loadData } from "../utils/fileManager";

/**
 * Authenticates a user by verifying their username and password.
 *
 * Features:
 * - Searches for a user in the database by their username and password.
 * - Returns the user object if authentication is successful.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {User | null} - The authenticated user object or `null` if authentication fails.
 */
export const authenticateUser = (username: string, password: string): User | null => {
  const data = loadData();
  return data.users.find((user: User) => user.username === username && user.password === password) || null;
};
