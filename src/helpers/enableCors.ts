import * as http from "http";

export function enableCors(res: http.ServerResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
}

export function handleOptions(
    req: http.IncomingMessage,
    res: http.ServerResponse
) {
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false;
}
