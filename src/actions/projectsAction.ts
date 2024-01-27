/* eslint-disable @typescript-eslint/no-explicit-any */
import sql from "../connection/connection";

import { Project } from "../types/types";

export const projectsActions = {
    async userExists(userId: string) {
        try {
            const userResult: readonly any[] | null =
                await sql`SELECT * FROM users WHERE id = ${userId}`;

            return userResult && userResult.length > 0;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async listAllProjectsById(userId: string) {
        try {
            const result: readonly Project[] | null =
                await sql`SELECT * FROM projects WHERE user_id = ${userId} `;

            if (!result || result.length === 0) {
                throw new Error("Projects not found");
            }

            const projects = result;

            return { projects };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async listOneProjectById(userId: string, projectId: string) {
        try {
            const result: readonly Project[] | null =
                await sql`SELECT * FROM projects WHERE user_id = ${userId} AND id = ${projectId}`;

            if (!result || result.length === 0)
                throw new Error("Project not found");

            const project = result[0];

            return { project };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async createProject(userId: string, newProject: Project) {
        try {
            const newProjectResult: readonly Project[] | null =
                await sql`INSERT INTO projects (
                name,
                description,
                url,
                urlGithub,
                user_id,
                cardImage,
                defaultImage,
                technologies
            ) VALUES (
               ${newProject.name},
               ${newProject.description},
               ${newProject.url},
               ${newProject.urlGithub},
               ${userId},
               ${newProject.cardImage},
               ${newProject.defaultImage},
               ${newProject.technologies as any}
            )
            RETURNING *`;

            if (!newProjectResult || newProjectResult.length === 0) {
                throw new Error("Internal server error");
            }

            return { project: newProjectResult[0] };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async deleteProject(userId: string, id: string) {
        try {
            const checkResult: readonly any[] | null = await sql`
            SELECT * FROM projects
            WHERE user_id = ${userId} AND id = ${id}`;

            if (!checkResult || checkResult.length === 0) {
                throw new Error("Project not found");
            }

            const deleteResult: any = await sql`
                DELETE FROM projects
                WHERE user_id = ${userId} AND id = ${id}
                RETURNING *`;

            if (!deleteResult || deleteResult.length === 0) {
                throw new Error("Project not found or could not be deleted");
            }

            return { message: "Project deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateProject(
        userId: string,
        projectId: string,
        updatedProject: Project
    ) {
        try {
            const checkResult: readonly any[] | null = await sql`
            SELECT * FROM projects
            WHERE user_id = ${userId} AND id = ${projectId}`;

            if (!checkResult || checkResult.length === 0) {
                throw new Error("Project not found");
            }

            const updateResult: readonly Project[] | null = await sql`
            UPDATE projects
            SET
              name = ${updatedProject.name},
              description = ${updatedProject.description},
              url = ${updatedProject.url},
              urlGithub = ${updatedProject.urlGithub},
              cardImage = ${updatedProject.cardImage},
              defaultImage = ${updatedProject.defaultImage},
              technologies = ${updatedProject.technologies as any}
            WHERE user_id = ${userId} AND id = ${projectId}
            RETURNING *`;

            if (!updateResult || updateResult.length === 0) {
                throw new Error("Project not updated");
            }

            return { project: updateResult[0] };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
