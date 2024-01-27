"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCors = void 0;
function enableCors(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return true;
    }
}
exports.enableCors = enableCors;
