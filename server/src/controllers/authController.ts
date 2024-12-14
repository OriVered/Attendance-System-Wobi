import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../services/authService";

const SECRET_KEY = "abcd";

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = authenticateUser(username, password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.json({ token, username: username, role: user.role, id: user.id });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

export const logout = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            jwt.verify(token, SECRET_KEY); 
            res.json({ message: "Logout successful" });
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(400).json({ message: "No token provided" });
    }
};