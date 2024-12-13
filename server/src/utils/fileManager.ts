import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "../data/data.json");

export const loadData = (): any => {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return { users: [], attendance: [] };
    }
};

export const saveData = (data: any): void => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};
