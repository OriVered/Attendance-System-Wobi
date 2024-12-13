import { Request, Response } from "express";
import { authenticateUser } from "../services/authService";

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = authenticateUser(username, password);

    if (result) {
        res.json(result);
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};
