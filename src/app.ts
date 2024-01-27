import * as http from "http";
import * as url from "url";

import routes from "./routes/routes";
import authMiddleware from "./middlewares/authMiddleware";
import handleRoute from "./handlers/handleRoute";

const server = http.createServer(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );

        if (req.method === "OPTIONS") {
            res.writeHead(200);
            res.end();
            return true;
        }

        const parsedUrl = url.parse(req.url || "", true);

        let pathname = parsedUrl.pathname || "";

        const splitEndPoint = pathname.split("/").filter(Boolean);
        if (splitEndPoint.length > 1) {
            pathname = `/${splitEndPoint[0]}/:id`;
        }

        const route = routes.find(
            (routeOBJ) =>
                routeOBJ.endpoint === pathname && routeOBJ.method === req.method
        );

        if (route) {
            authMiddleware(req, res, () => {
                handleRoute(req, res, route);
            });
        } else {
            res.writeHead(404, { "Content-type": "text/html" });
            res.end(`Cannot access ${req.method} ${parsedUrl.pathname}`);
        }
    }
);

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
