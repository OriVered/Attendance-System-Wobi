import { User } from "../models/userModel";
import { loadData } from "../utils/fileManager";

export const authenticateUser = (username: string, password: string): User | null => {
    const data = loadData();
    return data.users.find((user: User) => user.username === username && user.password === password) || null;
};
