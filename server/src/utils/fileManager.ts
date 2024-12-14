import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "../data/data.json");

export const loadData = (): any => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            throw new Error(`Data file not found at path: ${DATA_FILE}`);
        }

        const rawData = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(rawData);
    } catch (error: any) {
        console.error("Error loading data:", error.message);
        // Return a fallback default structure to keep the server running
        return {
            users: [],
            attendance: []
        };
    }
};

export const saveData = (data: any): void => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(DATA_FILE, jsonData, "utf-8");
        console.log("Data successfully saved.");
    } catch (error: any) {
        console.error("Error saving data:", error.message);
        // Optionally, you could log the data to a temporary backup file
        const backupFilePath = path.join(__dirname, "../../data-backup.json");
        try {
            fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2), "utf-8");
            console.warn("Data saved to backup file:", backupFilePath);
        } catch (backupError: any) {
            console.error("Error saving backup data:", backupError.message);
        }
    }
};
