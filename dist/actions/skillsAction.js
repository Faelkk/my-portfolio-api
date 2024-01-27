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
exports.SkillsAction = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const connection_1 = __importDefault(require("../connection/connection"));
exports.SkillsAction = {
    listAllSkills(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default) `SELECT * FROM skills WHERE user_id = ${userId} `;
                if (!result || result.length === 0) {
                    throw new Error("Skills not found");
                }
                const skills = result;
                return { skills };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    listOneSkillById(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default) `SELECT * FROM skills WHERE user_id = ${userId} AND id = ${id}`;
                if (!result || result.length === 0)
                    throw new Error("Skill not found");
                const skill = result[0];
                return { skill };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    createSkill(userId, newSkill) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield (0, connection_1.default) `SELECT 1 FROM users WHERE id = ${userId}`;
                if (!userExists || userExists.length === 0) {
                    throw new Error("User not found");
                }
                const skillResult = yield (0, connection_1.default) `INSERT INTO skills (
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
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    deleteSkill(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield (0, connection_1.default) `DELETE FROM skills WHERE user_id = ${userId} AND id = ${id} RETURNING *`;
                if (!deleteResult || deleteResult.length === 0) {
                    throw new Error("Skill not found or could not be deleted");
                }
                const deletedSkill = deleteResult[0];
                return { deletedSkill };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    updateSkill(userId, id, updatedSkill) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield (0, connection_1.default) `UPDATE skills
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
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
