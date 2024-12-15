import app from "./app";

const PORT = 5000; // Port number for the server

/**
 * Starts the Express server.
 *
 * Features:
 * - Binds the server to a specified port.
 * - Logs the server's URL to the console for easy access.
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
