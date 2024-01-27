"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
if (!config_1.default)
    throw new Error("error on connection to database");
const authMiddleware = (req, res, next) => {
    const publicRoutes = ["/signin", "/signup"];
    if (publicRoutes.includes(req.url)) {
        next();
    }
    else {
        const isAuthenticated = verifyToken(req);
        if (isAuthenticated) {
            next();
        }
        else {
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify({ error: "unauthorized" }));
        }
    }
};
function verifyToken(req) {
    const token = getTokenFromRequest(req);
    if (!token) {
        return false;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.userId = decoded.userId;
        return true;
    }
    catch (err) {
        return false;
    }
}
function getTokenFromRequest(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    return token || null;
}
exports.default = authMiddleware;
