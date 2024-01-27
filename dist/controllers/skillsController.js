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
Object.defineProperty(exports, "__esModule", { value: true });
const skillsAction_1 = require("../actions/skillsAction");
const activeUserId_1 = require("../helpers/activeUserId");
const skillsController = {
    listAllSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            try {
                const skills = yield skillsAction_1.SkillsAction.listAllSkills(userId);
                return res.send(200, skills);
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    listOneSkillById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { id } = req.params;
            try {
                const skill = yield skillsAction_1.SkillsAction.listOneSkillById(userId, id);
                return res.send(200, skill);
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    createSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { name, url, description } = req.body;
            try {
                if (!name || !url || !description)
                    return res.send(400, "Name,description and url are required");
                const newSkill = {
                    name,
                    url,
                    description,
                };
                const skills = yield skillsAction_1.SkillsAction.createSkill(userId, newSkill);
                return res.send(200, { skills });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    deleteSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { id } = req.params;
            try {
                const { deletedSkill } = yield skillsAction_1.SkillsAction.deleteSkill(userId, id);
                return res.send(200, {
                    message: "Skill deleted successfully",
                    deletedSkill,
                });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    updateSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { id } = req.params;
            const { name, url, description } = req.body;
            try {
                if (!name || !url || !description)
                    return res.send(400, "Name,description and url are required");
                const updatedSkillData = {
                    name,
                    url,
                    description,
                };
                const { updatedSkillResult } = yield skillsAction_1.SkillsAction.updateSkill(userId, id, updatedSkillData);
                return res.send(200, {
                    message: "Skill updated successfully",
                    updatedSkillResult,
                });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
};
exports.default = skillsController;
