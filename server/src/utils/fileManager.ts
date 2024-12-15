import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "../data/data.json"); // Path to the main data file

/**
 * Loads data from the JSON file.
 *
 * Features:
 * - Reads and parses data from the `data.json` file.
 * - Ensures the file exists before attempting to read.
 * - Provides a fallback default structure if the file is missing or an error occurs.
 *
 * @returns {any} The parsed JSON data or a default fallback structure.
 */
export const loadData = (): any => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      throw new Error(`Data file not found at path: ${DATA_FILE}`);
    }

    const rawData = fs.readFileSync(DATA_FILE, "utf-8"); // Read the file contents
    return JSON.parse(rawData); // Parse the JSON data
  } catch (error: any) {
    console.error("Error loading data:", error.message);

    // Return a fallback default structure to keep the server operational
    return {
      users: [], // Default users array
      attendance: [] // Default attendance array
    };
  }
};

/**
 * Saves data to the JSON file.
 *
 * Features:
 * - Serializes and writes data to the `data.json` file.
 * - Creates a backup file if saving fails.
 * - Logs success or error messages for debugging.
 *
 * @param {any} data - The data to save to the file.
 */
export const saveData = (data: any): void => {
  try {
    const jsonData = JSON.stringify(data, null, 2); // Format JSON with indentation
    fs.writeFileSync(DATA_FILE, jsonData, "utf-8"); // Write to the main data file
    console.log("Data successfully saved.");
  } catch (error: any) {
    console.error("Error saving data:", error.message);

    // Backup file logic for saving data in case of failure
    const backupFilePath = path.join(__dirname, "../../data-backup.json");
    try {
      fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2), "utf-8");
      console.warn("Data saved to backup file:", backupFilePath);
    } catch (backupError: any) {
      console.error("Error saving backup data:", backupError.message);
    }
  }
};
