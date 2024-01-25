import projectsController from "../controllers/projectsController";
import skillsController from "../controllers/skillsController";
import usersController from "../controllers/usersController";

const routes = [
    {
        endpoint: "/signin",
        method: "POST",
        handler: usersController.signin,
    },
    {
        endpoint: "/signup",
        method: "POST",
        handler: usersController.signup,
    },
    {
        endpoint: "/projects",
        method: "GET",
        handler: projectsController.listAllProjectsById,
    },
    {
        endpoint: "/projects/:id",
        method: "GET",
        handler: projectsController.listOneProjectById,
    },
    {
        endpoint: "/projects",
        method: "POST",
        handler: projectsController.createProject,
    },
    {
        endpoint: "/projects/:id",
        method: "DELETE",
        handler: projectsController.deleteProject,
    },
    {
        endpoint: "/projects/:id",
        method: "UPDATE",
        handler: projectsController.updateProject,
    },
    {
        endpoint: "/skills",
        method: "GET",
        handler: skillsController.listAllSkillsById,
    },
    {
        endpoint: "/skills/:id",
        method: "GET",
        handler: skillsController.listOneSkillById,
    },
    {
        endpoint: "/skills",
        method: "POST",
        handler: skillsController.createSkill,
    },
    {
        endpoint: "/skills/:id",
        method: "DELETE",
        handler: skillsController.deleteSkill,
    },
    {
        endpoint: "/skills/:id",
        method: "UPDATE",
        handler: skillsController.updateSkill,
    },
];

export default routes;
