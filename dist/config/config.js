"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Env {
    constructor(dbUrl, jwtSecret, supabaseUrl, supabaseKey) {
        this.dbUrl = dbUrl;
        this.jwtSecret = jwtSecret;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
    }
}
exports.Env = Env;
const env = new Env(process.env.DATABASE_URL, process.env.JWT_SECRET_KEY, process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
if (!env)
    throw new Error("Error for environment variable ");
exports.default = env;
