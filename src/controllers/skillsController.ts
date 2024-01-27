import { SkillsAction } from "../actions/skillsAction";
import { ActiveUserId } from "../helpers/activeUserId";
import { MyIncomingMessage, MyServerResponse } from "../types/types";

const skillsController = {
    async listAllSkills(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);

        try {
            const skills = await SkillsAction.listAllSkills(userId);

            return res.send(200, skills);
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async listOneSkillById(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);

        const { id } = req.params;

        try {
            const skill = await SkillsAction.listOneSkillById(userId, id);

            return res.send(200, skill);
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async createSkill(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);
        const { name, url, description } = req.body;

        try {
            if (!name || !url || !description)
                return res.send(400, "Name,description and url are required");

            const newSkill = {
                name,
                url,
                description,
            };

            const skills = await SkillsAction.createSkill(userId, newSkill);

            return res.send(200, { skills });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async deleteSkill(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);
        const { id } = req.params;

        try {
            const { deletedSkill } = await SkillsAction.deleteSkill(userId, id);

            return res.send(200, {
                message: "Skill deleted successfully",
                deletedSkill,
            });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },

    async updateSkill(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);
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

            const { updatedSkillResult } = await SkillsAction.updateSkill(
                userId,
                id,
                updatedSkillData
            );

            return res.send(200, {
                message: "Skill updated successfully",
                updatedSkillResult,
            });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
};

export default skillsController;
