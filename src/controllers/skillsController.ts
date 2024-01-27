import { MyIncomingMessage, MyServerResponse } from "../types/types";
// import { ActiveUserId } from "../helpers/activeUserId";

const skillsController = {
    listAllSkills(req: MyIncomingMessage, res: MyServerResponse) {
        console.log(`${req.userId} req.userId`);

        // const { userId } = ActiveUserId(req, res);
        // console.log(`${userId} active userId`);

        return res.send(200, { login: true });
    },
    listOneSkillById(req: MyIncomingMessage, res: MyServerResponse) {
        console.log(`${req.userId} req.userId`);
        return res.send(200, { login: true });
    },
    createSkill(req: MyIncomingMessage, res: MyServerResponse) {
        return res.send(200, { login: true });
    },
    deleteSkill(req: MyIncomingMessage, res: MyServerResponse) {
        return res.send(200, { login: true });
    },
    updateSkill(req: MyIncomingMessage, res: MyServerResponse) {
        return res.send(200, { login: true });
    },
};

export default skillsController;
