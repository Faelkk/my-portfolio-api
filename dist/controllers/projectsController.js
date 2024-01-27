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
const activeUserId_1 = require("../helpers/activeUserId");
const projectsAction_1 = require("../actions/projectsAction");
const validateProjectBody_1 = __importDefault(require("../utils/validateProjectBody"));
const projectsController = {
    listAllProjectsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            try {
                const { projects } = yield projectsAction_1.projectsActions.listAllProjectsById(userId);
                return res.send(200, { projects });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    listOneProjectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { id } = req.params;
            try {
                const { project } = yield yield projectsAction_1.projectsActions.listOneProjectById(userId, id);
                return res.send(200, { project });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            try {
                const uploadedFiles = req.uploadedFiles;
                const cardImage = `https://xuzdphbfhelowfyqmpen.supabase.co/storage/v1/object/public/uploads/${uploadedFiles[0].path}`;
                const defaultImage = `https://xuzdphbfhelowfyqmpen.supabase.co/storage/v1/object/public/uploads/${uploadedFiles[1].path}`;
                (0, validateProjectBody_1.default)(req);
                const { name, description, technologies, url, urlGithub, } = req.body;
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
                const projects = yield projectsAction_1.projectsActions.createProject(userId, newProject);
                return res.send(200, { projects });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { id } = req.params;
            try {
                const result = yield projectsAction_1.projectsActions.deleteProject(userId, id);
                if (result.message) {
                    return res.send(200, {
                        deleted: true,
                        message: result.message,
                    });
                }
                else {
                    return res.send(200, { deleted: true });
                }
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield (0, activeUserId_1.ActiveUserId)(req);
            const { id } = req.params;
            try {
                const { name, description, technologies, url, urlGithub, } = req.body;
                (0, validateProjectBody_1.default)(req);
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
                const { project } = yield projectsAction_1.projectsActions.updateProject(userId, id, updatedProject);
                return res.send(200, { project });
            }
            catch (error) {
                return res.send(400, { error: error.message });
            }
        });
    },
};
exports.default = projectsController;
