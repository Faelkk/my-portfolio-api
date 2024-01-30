/* eslint-disable indent */
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "../connection/connection";
import env from "../config/config";

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

interface UserWithApiKey extends User {
    api_key: string;
}

export const usersActions = {
    async signin(email: string, password: string) {
        try {
            const userResult: readonly UserWithApiKey[] = await sql`
        SELECT users.*, api_keys.key_value as api_key
        FROM users
        LEFT JOIN api_keys ON users.id = api_keys.user_id
        WHERE email = ${email}
      `;

            const user: UserWithApiKey | undefined = userResult[0];

            if (!user) {
                throw new Error("User not found");
            }

            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("Invalid email or password");
            }

            const accessToken = jwt.sign(
                { userId: user.id, email: user.email },
                env.jwtSecret!,
                { expiresIn: "7d" }
            );

            return { accessToken, apiKey: user.api_key };
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

            const apiKey = crypto.randomBytes(16).toString("hex");

            const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser =
                await sql` INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashedPassword}) RETURNING *`;

            if (!newUser) {
                throw new Error("Internal server error");
            }

            const apiKeyResult = await sql`
            INSERT INTO api_keys (key_value, user_id) VALUES (${apiKey}, ${newUser[0].id}) RETURNING *
        `;
            if (!apiKeyResult) {
                throw new Error("Internal server error");
            }

            const accessToken = jwt.sign(
                { userId: apiKeyResult[0].user_id, email: email },
                env.jwtSecret!,
                { expiresIn: "7d" }
            );

            return { accessToken, apiKey };
        } catch (error) {
            console.log(error);

            throw new Error(error.message);
        }
    },
};
