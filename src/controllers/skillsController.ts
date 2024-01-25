import { MyIncomingMessage, MyServerResponse } from "../types/types";

const skillsController = {
    listAllSkillsById(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    listOneSkillById(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    createSkill(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    deleteSkill(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    updateSkill(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
};

export default skillsController;
