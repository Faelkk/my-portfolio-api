import { MyServerResponse } from "../types/types";

const sendJsonResponse = (
    res: MyServerResponse,
    statusCode: number,
    body: unknown
) => {
    res.writeHead(statusCode, { "Content-type": "application/json" });
    res.end(JSON.stringify(body));
};

export default sendJsonResponse;
