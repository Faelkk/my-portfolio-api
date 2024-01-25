import postgres from "postgres";
import env from "../config/config";

if (!env) throw new Error("error on connection to database");

const sql = postgres(env.dbUrl!);

export default sql;
