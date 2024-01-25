import { MyIncomingMessage, MyServerResponse } from "../types/types";

const projectsController = {
    listAllProjectsById(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    listOneProjectById(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    createProject(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    deleteProject(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
    updateProject(req: MyIncomingMessage, res: MyServerResponse) {
        res.send!(200, { login: true });
    },
};

export default projectsController;
