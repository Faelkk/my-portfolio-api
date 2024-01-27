"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = exports.enableCors = void 0;
function enableCors(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
exports.enableCors = enableCors;
function handleOptions(req, res) {
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false;
}
exports.handleOptions = handleOptions;
