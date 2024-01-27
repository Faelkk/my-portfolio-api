/* eslint-disable @typescript-eslint/no-explicit-any */
import sql from "../connection/connection";
import { Skill } from "../types/types";

export const SkillsAction = {
    async listAllSkills(userId: string) {
        try {
            const result: readonly Skill[] | null =
                await sql`SELECT * FROM skills WHERE user_id = ${userId} `;

            if (!result || result.length === 0) {
                throw new Error("Skills not found");
            }

            const skills = result;

            return { skills };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async listOneSkillById(userId: string, id: string) {
        try {
            const result: readonly Skill[] | null =
                await sql`SELECT * FROM skills WHERE user_id = ${userId} AND id = ${id}`;

            if (!result || result.length === 0)
                throw new Error("Skill not found");

            const skill = result[0];

            return { skill };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async createSkill(userId, newSkill) {
        try {
            const userExists =
                await sql`SELECT 1 FROM users WHERE id = ${userId}`;
            if (!userExists || userExists.length === 0) {
                throw new Error("User not found");
            }

            const skillResult = await sql`INSERT INTO skills (
                name,
                description,
                url,
                user_id
            ) VALUES (
                ${newSkill.name},
                ${newSkill.description},
                ${newSkill.url},
                ${userId}
            ) RETURNING *`;

            if (!skillResult || skillResult.length === 0) {
                throw new Error("Internal server error");
            }

            const skillCreated = skillResult[0];

            return { skillCreated };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async deleteSkill(userId: string, id: string) {
        try {
            const deleteResult =
                await sql`DELETE FROM skills WHERE user_id = ${userId} AND id = ${id} RETURNING *`;

            if (!deleteResult || deleteResult.length === 0) {
                throw new Error("Skill not found or could not be deleted");
            }

            const deletedSkill = deleteResult[0];

            return { deletedSkill };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateSkill(
        userId: string,
        id: string,
        updatedSkill: Partial<Skill>
    ) {
        try {
            const updateResult = await sql`UPDATE skills
                SET
                    name = COALESCE(${updatedSkill.name}, name),
                    description = COALESCE(${updatedSkill.description}, description),
                    url = COALESCE(${updatedSkill.url}, url)
                WHERE user_id = ${userId} AND id = ${id}
                RETURNING *`;

            if (!updateResult || updateResult.length === 0) {
                throw new Error("Skill not found or could not be updated");
            }

            const updatedSkillResult = updateResult[0];

            return { updatedSkillResult };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
