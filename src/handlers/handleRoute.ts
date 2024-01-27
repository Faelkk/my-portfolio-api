import sendJsonResponse from "../utils/sendJsonResponse";
import bodyParserMiddleware from "../middlewares/bodyParseMiddleware";
import { MyIncomingMessage, MyServerResponse } from "../types/types";
import * as http from "http";
import uploadMiddleware from "../middlewares/uploadMiddleware";

interface Route {
    endpoint: string;
    method: string;
    handler: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

const handleRoute = (
    req: MyIncomingMessage,
    res: MyServerResponse,
    route: Route
) => {
    req.query = Object.fromEntries(
        new URL(`http://localhost:5000${req.url}`).searchParams
    );

    req.params = { id: req.url?.split("/").filter(Boolean)[1] };

    res.send = (statusCode: number, body?: unknown) =>
        sendJsonResponse(res, statusCode, body);

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        if (
            req.headers["content-type"] &&
            req.headers["content-type"].startsWith("multipart/form-data")
        ) {
            const uploadHandler = uploadMiddleware([
                "cardImage",
                "cardDefault",
            ]);

            uploadHandler(req, res, (error) => {
                if (error) {
                    res.send(500, { error: "Erro no upload dos arquivos" });
                } else {
                    route.handler(req, res);
                }
            });

            return;
        }
    }
    bodyParserMiddleware(req, res, () => route.handler(req, res));
};

export default handleRoute;
