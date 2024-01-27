"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectsController_1 = __importDefault(require("../controllers/projectsController"));
const skillsController_1 = __importDefault(require("../controllers/skillsController"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const routes = [
    {
        endpoint: "/signin",
        method: "POST",
        handler: usersController_1.default.signin,
    },
    {
        endpoint: "/signup",
        method: "POST",
        handler: usersController_1.default.signup,
    },
    {
        endpoint: "/projects",
        method: "GET",
        handler: projectsController_1.default.listAllProjectsById,
    },
    {
        endpoint: "/projects/:id",
        method: "GET",
        handler: projectsController_1.default.listOneProjectById,
    },
    {
        endpoint: "/projects",
        method: "POST",
        handler: projectsController_1.default.createProject,
    },
    {
        endpoint: "/projects/:id",
        method: "DELETE",
        handler: projectsController_1.default.deleteProject,
    },
    {
        endpoint: "/projects/:id",
        method: "PUT",
        handler: projectsController_1.default.updateProject,
    },
    {
        endpoint: "/skills",
        method: "GET",
        handler: skillsController_1.default.listAllSkills,
    },
    {
        endpoint: "/skills/:id",
        method: "GET",
        handler: skillsController_1.default.listOneSkillById,
    },
    {
        endpoint: "/skills",
        method: "POST",
        handler: skillsController_1.default.createSkill,
    },
    {
        endpoint: "/skills/:id",
        method: "DELETE",
        handler: skillsController_1.default.deleteSkill,
    },
    {
        endpoint: "/skills/:id",
        method: "PUT",
        handler: skillsController_1.default.updateSkill,
    },
];
exports.default = routes;
