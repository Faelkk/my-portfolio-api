import dotenv from "dotenv";

dotenv.config();

export class Env {
    dbUrl: string | undefined;
    jwtSecret: string | undefined;

    constructor(dbUrl: string | undefined, jwtSecret: string | undefined) {
        this.dbUrl = dbUrl;
        this.jwtSecret = jwtSecret;
    }
}

const env = new Env(process.env.DATABASE_URL, process.env.JWT_SECRET_KEY);

if (!env) throw new Error("Error for environment variable ");

export default env;
