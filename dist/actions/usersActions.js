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
exports.usersActions = void 0;
const config_1 = __importDefault(require("../config/config"));
const connection_1 = __importDefault(require("../connection/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.usersActions = {
    signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userResult = yield (0, connection_1.default) `SELECT * FROM users WHERE email = ${email}`;
                const user = userResult[0];
                if (!user) {
                    throw new Error("User not found");
                }
                if (!bcrypt_1.default.compareSync(password, user.password)) {
                    throw new Error("Invalid email or password");
                }
                const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: "7d" });
                return accessToken;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    signup(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield (0, connection_1.default) `SELECT * FROM users WHERE email = ${email}`;
                if (existingUser.length > 0) {
                    throw new Error("User with the same email already exists");
                }
                const hashedPassword = bcrypt_1.default.hashSync(password, 10);
                const result = yield (0, connection_1.default) `INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashedPassword}) RETURNING *`;
                const accessToken = jsonwebtoken_1.default.sign({ userId: result[0].id, email: result[0].email }, config_1.default.jwtSecret, { expiresIn: "7d" });
                return accessToken;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
