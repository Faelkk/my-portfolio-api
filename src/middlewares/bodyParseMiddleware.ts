import { bodyParser } from "../helpers/bodyParser";
import { MyIncomingMessage, MyServerResponse } from "../types/types";

const bodyParseMiddleware = (
    req: MyIncomingMessage,
    res: MyServerResponse,
    next: () => void
) => {
    bodyParser(req, () => next());
};

export default bodyParseMiddleware;
