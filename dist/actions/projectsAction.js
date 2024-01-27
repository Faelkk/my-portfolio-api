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
exports.projectsActions = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const connection_1 = __importDefault(require("../connection/connection"));
exports.projectsActions = {
    userExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userResult = yield (0, connection_1.default) `SELECT * FROM users WHERE id = ${userId}`;
                return userResult && userResult.length > 0;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    listAllProjectsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default) `SELECT * FROM projects WHERE user_id = ${userId} `;
                if (!result || result.length === 0) {
                    throw new Error("Projects not found");
                }
                const projects = result;
                return { projects };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    listOneProjectById(userId, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default) `SELECT * FROM projects WHERE user_id = ${userId} AND id = ${projectId}`;
                if (!result || result.length === 0)
                    throw new Error("Project not found");
                const project = result[0];
                return { project };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    createProject(userId, newProject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProjectResult = yield (0, connection_1.default) `INSERT INTO projects (
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
               ${newProject.technologies}
            )
            RETURNING *`;
                if (!newProjectResult || newProjectResult.length === 0) {
                    throw new Error("Internal server error");
                }
                return { project: newProjectResult[0] };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    deleteProject(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkResult = yield (0, connection_1.default) `
            SELECT * FROM projects
            WHERE user_id = ${userId} AND id = ${id}`;
                if (!checkResult || checkResult.length === 0) {
                    throw new Error("Project not found");
                }
                const deleteResult = yield (0, connection_1.default) `
                DELETE FROM projects
                WHERE user_id = ${userId} AND id = ${id}
                RETURNING *`;
                if (!deleteResult || deleteResult.length === 0) {
                    throw new Error("Project not found or could not be deleted");
                }
                return { message: "Project deleted successfully" };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    updateProject(userId, projectId, updatedProject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkResult = yield (0, connection_1.default) `
            SELECT * FROM projects
            WHERE user_id = ${userId} AND id = ${projectId}`;
                if (!checkResult || checkResult.length === 0) {
                    throw new Error("Project not found");
                }
                const updateResult = yield (0, connection_1.default) `
            UPDATE projects
            SET
              name = ${updatedProject.name},
              description = ${updatedProject.description},
              url = ${updatedProject.url},
              urlGithub = ${updatedProject.urlGithub},
              cardImage = ${updatedProject.cardImage},
              defaultImage = ${updatedProject.defaultImage},
              technologies = ${updatedProject.technologies}
            WHERE user_id = ${userId} AND id = ${projectId}
            RETURNING *`;
                if (!updateResult || updateResult.length === 0) {
                    throw new Error("Project not updated");
                }
                return { project: updateResult[0] };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
