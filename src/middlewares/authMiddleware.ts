import * as http from "http";
import env from "../config/config";
import sql from "../connection/connection";
import jwt from "jsonwebtoken";

interface MyIncomingMessage extends http.IncomingMessage {
    userId?: string;
}

if (!env) throw new Error("error on connection to database");

async function authMiddleware(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: () => void
) {
    const isPublicRoute = ["/signin", "/signup"].includes(req.url!);

    if (isPublicRoute) {
        next();
    } else {
        try {
            await verifyJWTTokenFromRequest(req);

            if (isWriteMethod(req.method)) {
                const isApiKeyValid = await validateApiKeyFromRequest(req);

                if (isApiKeyValid) {
                    next();
                } else {
                    res.writeHead(400, { "Content-type": "application/json" });
                    res.end(JSON.stringify({ error: "unauthorized" }));
                }
            } else {
                next();
            }
        } catch (error) {
            res.writeHead(401, { "Content-type": "application/json" });
            res.end(JSON.stringify({ error: "unauthorized" }));
        }
    }
}

async function validateApiKeyFromRequest(req: MyIncomingMessage) {
    const apiKey = getApiKeyFromRequest(req);

    if (apiKey) {
        return await validateApiKey(apiKey, req);
    } else {
        return false;
    }
}

async function verifyJWTTokenFromRequest(req: MyIncomingMessage) {
    const token = await getTokenFromRequest(req);

    if (token) {
        await verifyJWTToken(req, token);
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

async function verifyJWTToken(req: MyIncomingMessage, token: string) {
    try {
        const decoded = (await jwt.verify(token, env.jwtSecret!)) as {
            userId: string;
        };
        req.userId = decoded.userId;
    } catch (err) {
        throw new Error("Token verification failed");
    }
}

async function validateApiKey(apiKey: string, req: MyIncomingMessage) {
    try {
        const result = await sql`
            SELECT id FROM api_keys
            WHERE key_value = ${apiKey} AND user_id = ${req.userId}
        `;

        return result.length > 0;
    } catch (error) {
        throw new Error("API key validation failed");
    }
}
function isWriteMethod(method: string) {
    return ["PUT", "DELETE", "POST"].includes(method);
}

export default authMiddleware;
