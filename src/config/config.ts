import dotenv from "dotenv";

dotenv.config();

export class Env {
    dbUrl: string | undefined;
    jwtSecret: string | undefined;
    supabaseUrl: string | undefined;
    supabaseKey: string | undefined;

    constructor(
        dbUrl: string | undefined,
        jwtSecret: string | undefined,
        supabaseUrl: string | undefined,
        supabaseKey: string | undefined
    ) {
        this.dbUrl = dbUrl;
        this.jwtSecret = jwtSecret;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
    }
}

const env = new Env(
    process.env.DATABASE_URL,
    process.env.JWT_SECRET_KEY,
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

if (!env) throw new Error("Error for environment variable ");

export default env;
