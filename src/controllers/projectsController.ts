import {
    MyIncomingMessage,
    MyServerResponse,
    ResponseBody,
} from "../types/types";

import { ActiveUserId } from "../helpers/activeUserId";
import { projectsActions } from "../actions/projectsAction";
import validateProjectBody from "../utils/validateProjectBody";

const projectsController = {
    async listAllProjectsById(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);

        if (!userId) {
            res.send(400, "User not found");
        }

        try {
            const { projects } = await projectsActions.listAllProjectsById(
                userId
            );

            return res.send(200, { projects });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async listOneProjectById(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);

        if (!userId) {
            res.send(400, "User not found");
        }

        const { id } = req.params;

        try {
            const { project } = await await projectsActions.listOneProjectById(
                userId,
                id
            );

            return res.send(200, { project });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async createProject(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);

        if (!userId) {
            throw new Error("User not found");
        }

        try {
            const uploadedFiles = req.uploadedFiles;

            const cardImage = `https://xuzdphbfhelowfyqmpen.supabase.co/storage/v1/object/public/uploads/${uploadedFiles[0].path}`;
            const defaultImage = `https://xuzdphbfhelowfyqmpen.supabase.co/storage/v1/object/public/uploads/${uploadedFiles[1].path}`;
            validateProjectBody(req);

            const {
                name,
                description,
                technologies,
                url,
                urlGithub,
            }: ResponseBody = req.body;

            const newProject = {
                name,
                description,
                url,
                urlGithub,
                userId,
                cardImage,
                defaultImage,
                technologies,
            };

            const projects = await projectsActions.createProject(
                userId,
                newProject
            );

            return res.send(200, { projects });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async deleteProject(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);

        if (!userId) {
            res.send(400, "User not found");
        }

        const { id } = req.params;

        try {
            const result = await projectsActions.deleteProject(userId, id);

            if (result.message) {
                return res.send(200, {
                    deleted: true,
                    message: result.message,
                });
            } else {
                return res.send(200, { deleted: true });
            }
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
    async updateProject(req: MyIncomingMessage, res: MyServerResponse) {
        const { userId } = await ActiveUserId(req);
        if (!userId) {
            res.send(400, "User not found");
        }

        const { id } = req.params;

        try {
            const {
                name,
                description,
                technologies,
                url,
                urlGithub,
            }: ResponseBody = req.body;

            validateProjectBody(req);

            const uploadedFiles = req.uploadedFiles;

            const updatedProject = {
                name,
                description,
                url,
                urlGithub,
                userId,
                cardImage: `https://xuzdphbfhelowfyqmpen.supabase.co/storage/v1/object/public/uploads/${uploadedFiles[0].path}`,
                defaultImage: `https://xuzdphbfhelowfyqmpen.supabase.co/storage/v1/object/public/uploads/${uploadedFiles[1].path}`,
                technologies,
            };

            const { project } = await projectsActions.updateProject(
                userId,
                id,
                updatedProject
            );

            return res.send(200, { project });
        } catch (error) {
            return res.send(400, { error: error.message });
        }
    },
};

export default projectsController;
