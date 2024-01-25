import * as http from "http";
import * as url from "url";
import { enableCors, handleOptions } from "./helpers/enableCors";
import routes from "./routes/routes";
import authMiddleware from "./middlewares/authMiddleware";
import handleRoute from "./handlers/handleRoute";

const server = http.createServer(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (handleOptions(req, res)) {
            return;
        }
        const parsedUrl = url.parse(req.url || "", true);

        let pathname = parsedUrl.pathname || "";

        const splitEndPoint = pathname.split("/").filter(Boolean);
        if (splitEndPoint.length > 1) {
            pathname = `/${splitEndPoint[0]}/:id`;
        }

        enableCors(res);
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
