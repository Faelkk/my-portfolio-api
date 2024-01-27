"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser_1 = require("../helpers/bodyParser");
const bodyParseMiddleware = (req, res, next) => {
    (0, bodyParser_1.bodyParser)(req, () => next());
};
exports.default = bodyParseMiddleware;
