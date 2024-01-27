"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendJsonResponse_1 = __importDefault(require("../utils/sendJsonResponse"));
const bodyParseMiddleware_1 = __importDefault(require("../middlewares/bodyParseMiddleware"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const handleRoute = (req, res, route) => {
    var _a;
    req.query = Object.fromEntries(new URL(`http://localhost:5000${req.url}`).searchParams);
    req.params = { id: (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/").filter(Boolean)[1] };
    res.send = (statusCode, body) => (0, sendJsonResponse_1.default)(res, statusCode, body);
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        if (req.headers["content-type"] &&
            req.headers["content-type"].startsWith("multipart/form-data")) {
            const uploadHandler = (0, uploadMiddleware_1.default)([
                "cardImage",
                "cardDefault",
            ]);
            uploadHandler(req, res, (error) => {
                if (error) {
                    res.send(500, { error: "Erro no upload dos arquivos" });
                }
                else {
                    route.handler(req, res);
                }
            });
            return;
        }
    }
    (0, bodyParseMiddleware_1.default)(req, res, () => route.handler(req, res));
};
exports.default = handleRoute;
