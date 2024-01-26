import env from "../config/config";
import sql from "../connection/connection";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

export const usersActions = {
    async signin(email: string, password: string) {
        try {
            const userResult: readonly User[] =
                await sql`SELECT * FROM users WHERE email = ${email}`;
            const user: User | undefined = userResult[0];

            if (!user) {
                throw new Error("User not found");
            }

            if (!bycrpt.compareSync(password, user.password)) {
                throw new Error("Invalid email or password");
            }

            const accessToken = jwt.sign(
                { userId: user.id, email: user.email },
                env.jwtSecret,
                { expiresIn: "7d" }
            );

            return accessToken;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async signup(email: string, name: string, password: string) {
        try {
            const existingUser: User[] =
                await sql`SELECT * FROM users WHERE email = ${email}`;

            if (existingUser.length > 0) {
                throw new Error("User with the same email already exists");
            }

            const hashedPassword = bycrpt.hashSync(password, 10);

            const result: User[] =
                await sql`INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashedPassword}) RETURNING *`;

            const accessToken = jwt.sign(
                { userId: result[0].id, email: result[0].email },
                env.jwtSecret,
                { expiresIn: "7d" }
            );

            return accessToken;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
