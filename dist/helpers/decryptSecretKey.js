"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptSecretKey = void 0;
const config_1 = __importDefault(require("../config/config"));
const crypto_1 = __importDefault(require("crypto"));
const decryptSecretKey = (encrypted) => {
    try {
        const [iv, encryptedSecretKey] = encrypted.split(":");
        const decipher = crypto_1.default.createDecipheriv("AES-CBC", Buffer.from(config_1.default.jwtSecret, "hex"), Buffer.from(iv, "hex"));
        let decrypted = decipher.update(encryptedSecretKey, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted.toString();
    }
    catch (error) {
        console.log(error);
    }
};
exports.decryptSecretKey = decryptSecretKey;
