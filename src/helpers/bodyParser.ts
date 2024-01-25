import { IncomingMessage } from "http";

interface RequestWithBody extends IncomingMessage {
    body?: unknown;
}

export function bodyParser(
    req: RequestWithBody,
    callback: (error?: unknown) => void
) {
    let body = "";

    req.on("data", (chunk: Buffer) => {
        body += chunk;
    });

    req.on("end", () => {
        try {
            if (body) {
                body = JSON.parse(body);
                console.log(body);
            }
            req.body = body;
            callback();
        } catch (error) {
            callback(error);
        }
    });
}
