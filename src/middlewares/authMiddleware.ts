import * as http from "http";
import env from "../config/config";
import sql from "../connection/connection";
import jwt from "jsonwebtoken";

interface MyIncomingMessage extends http.IncomingMessage {
    userId?: string;
}

if (!env) throw new Error("error on connection to database");

const authMiddleware = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: () => void
) => {
    const isPublicRoute = ["/signin", "/signup"].includes(req.url!);
    const isWriteOperation = isWriteMethod(req.method);

    if (isPublicRoute || !isWriteOperation) {
        next();
    } else {
        const isAuthenticated = verifyAuthentication(req);

        if (isAuthenticated) {
            next();
        } else {
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify({ error: "unauthorized" }));
        }
    }
};

function verifyAuthentication(req: MyIncomingMessage) {
    const token = getTokenFromRequest(req);

    if (token) {
        return verifyJWTToken(req, token);
    } else if (isWriteMethod(req.method)) {
        const apiKey = getApiKeyFromRequest(req);
        return apiKey ? validateApiKey(apiKey) : false;
    } else {
        return false;
    }
}

function getTokenFromRequest(req: MyIncomingMessage) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    return token || null;
}

function getApiKeyFromRequest(req: MyIncomingMessage): string | null {
    return req.headers.apikey ? String(req.headers.apikey) : null;
}

function verifyJWTToken(req: MyIncomingMessage, token: string) {
    try {
        const decoded = jwt.verify(token, env.jwtSecret!) as {
            userId: string;
        };
        req.userId = decoded.userId;
        return true;
    } catch (err) {
        return false;
    }
}

async function validateApiKey(apiKey: string) {
    try {
        const result = await sql`
            SELECT id FROM api_keys
            WHERE key_value = ${apiKey}
        `;

        return result.length > 0;
    } catch (error) {
        console.error("Erro na validação da API key:", error);
        return false;
    }
}

function isWriteMethod(method: string) {
    return ["PUT", "DELETE", "POST"].includes(method);
}

export default authMiddleware;
