"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const url = __importStar(require("url"));
const enableCors_1 = require("./helpers/enableCors");
const routes_1 = __importDefault(require("./routes/routes"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const handleRoute_1 = __importDefault(require("./handlers/handleRoute"));
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, enableCors_1.handleOptions)(req, res)) {
        return;
    }
    const parsedUrl = url.parse(req.url || "", true);
    let pathname = parsedUrl.pathname || "";
    const splitEndPoint = pathname.split("/").filter(Boolean);
    if (splitEndPoint.length > 1) {
        pathname = `/${splitEndPoint[0]}/:id`;
    }
    (0, enableCors_1.enableCors)(res);
    const route = routes_1.default.find((routeOBJ) => routeOBJ.endpoint === pathname && routeOBJ.method === req.method);
    if (route) {
        (0, authMiddleware_1.default)(req, res, () => {
            (0, handleRoute_1.default)(req, res, route);
        });
    }
    else {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end(`Cannot access ${req.method} ${parsedUrl.pathname}`);
    }
}));
server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
