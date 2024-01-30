"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const connection_1 = __importDefault(require("../connection/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!config_1.default)
    throw new Error("error on connection to database");
const authMiddleware = (req, res, next) => {
    const isPublicRoute = ["/signin", "/signup"].includes(req.url);
    const isWriteOperation = isWriteMethod(req.method);
    if (isPublicRoute || !isWriteOperation) {
        next();
    }
    else {
        const isAuthenticated = verifyAuthentication(req);
        if (isAuthenticated) {
            next();
        }
        else {
            res.writeHead(400, { "Content-type": "application/json" });
            res.end(JSON.stringify({ error: "unauthorized" }));
        }
    }
};
function verifyAuthentication(req) {
    const token = getTokenFromRequest(req);
    if (token) {
        return verifyJWTToken(req, token);
    }
    else if (isWriteMethod(req.method)) {
        const apiKey = getApiKeyFromRequest(req);
        return apiKey ? validateApiKey(apiKey) : false;
    }
    else {
        return false;
    }
}
function getTokenFromRequest(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    return token || null;
}
function getApiKeyFromRequest(req) {
    return req.headers.apikey ? String(req.headers.apikey) : null;
}
function verifyJWTToken(req, token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.userId = decoded.userId;
        return true;
    }
    catch (err) {
        return false;
    }
}
function validateApiKey(apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, connection_1.default) `
            SELECT id FROM api_keys
            WHERE key_value = ${apiKey}
        `;
            return result.length > 0;
        }
        catch (error) {
            console.error("Erro na validação da API key:", error);
            return false;
        }
    });
}
function isWriteMethod(method) {
    return ["PUT", "DELETE", "POST"].includes(method);
}
exports.default = authMiddleware;
