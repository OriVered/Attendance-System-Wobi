import { User } from "../models/userModel";
import { loadData } from "../utils/fileManager";

export const authenticateUser = (username: string, password: string): { token: string, role: string } | null => {
    const data = loadData();
    const user = data.users.find((u: User) => u.username === username && u.password === password);

    if (user) {
        const token = `${user.username}-token`; // Dummy token
        return { token, role: user.role };
    }

    return null;
};
