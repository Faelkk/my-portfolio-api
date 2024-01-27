import jwt from "jsonwebtoken";
import env from "../config/config";
import * as http from "http";

interface MyIncomingMessage extends http.IncomingMessage {
    userId?: string;
}

if (!env) throw new Error("error on connection to database");

const authMiddleware = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: () => void
) => {
    const publicRoutes = ["/signin", "/signup"];

    if (publicRoutes.includes(req.url!)) {
        next();
    } else {
        const isAuthenticated = verifyToken(req);

        if (isAuthenticated) {
            next();
        } else {
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify({ error: "unauthorized" }));
        }
    }
};

function verifyToken(req: MyIncomingMessage) {
    const token = getTokenFromRequest(req);

    if (!token) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, env.jwtSecret!) as { userId: string };

        req.userId = decoded.userId;

        return true;
    } catch (err) {
        return false;
    }
}

function getTokenFromRequest(req: MyIncomingMessage) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    return token || null;
}

export default authMiddleware;
