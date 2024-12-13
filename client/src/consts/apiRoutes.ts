/**
 * API Routes used across the application.
 * Keeping routes in a single file makes it easy to update or extend APIs.
 */
const API_BASE_URL = "http://localhost:5000/api";


export const API_ROUTES = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  ATTENDANCE: `${API_BASE_URL}/attendance`,
};

export default API_ROUTES;
