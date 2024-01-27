"use strict";
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
const emailValidation_1 = __importDefault(require("../utils/emailValidation"));
const validatePassword_1 = __importDefault(require("../utils/validatePassword"));
const usersActions_1 = require("../actions/usersActions");
const usersController = {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password)
                return res.send(400, { error: "Email and password are required" });
            if (!(0, validatePassword_1.default)(password))
                return res.send(400, {
                    error: "Password needs to be at least 8 characters",
                });
            if (!(0, emailValidation_1.default)(email))
                return res.send(400, { error: "Invalid email address" });
            try {
                const accessToken = yield usersActions_1.usersActions.signin(email, password);
                return res.send(200, { accessToken });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = req.body;
            if (!email || !name || !password)
                return res.send(400, {
                    error: "Email,name and password are required",
                });
            if (!(0, emailValidation_1.default)(email))
                return res.send(400, { error: "Invalid email address" });
            if (!(0, validatePassword_1.default)(password))
                return res.send(400, {
                    error: "Password needs to be at least 8 characters",
                });
            try {
                const accessToken = yield usersActions_1.usersActions.signup(email, name, password);
                return res.send(200, { accessToken });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
};
exports.default = usersController;
