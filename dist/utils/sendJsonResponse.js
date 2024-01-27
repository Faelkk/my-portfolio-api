"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendJsonResponse = (res, statusCode, body) => {
    res.writeHead(statusCode, { "Content-type": "application/json" });
    res.end(JSON.stringify(body));
};
exports.default = sendJsonResponse;
