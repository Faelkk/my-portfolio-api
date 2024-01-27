"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateProjectBody(req) {
    if (!req) {
        throw new Error("Request body is missing");
    }
    const { name, description, urlGithub, url, technologies } = req.body;
    if (!name) {
        throw new Error("Project name is required");
    }
    if (!description) {
        throw new Error("Project description is required");
    }
    if (!urlGithub) {
        throw new Error("GitHub URL is required");
    }
    if (!url) {
        throw new Error("Project URL is required");
    }
    if (!technologies) {
        throw new Error("technologies is required");
    }
    const technologiesArray = JSON.parse(technologies);
    if (!technologiesArray ||
        !Array.isArray(technologiesArray) ||
        technologiesArray.length === 0) {
        throw new Error("Technologies must be a non-empty array");
    }
    technologiesArray.forEach((tech, index) => {
        if (!tech ||
            typeof tech !== "object" ||
            !("name" in tech) ||
            !("url" in tech)) {
            throw new Error(`Invalid technology at index ${index}`);
        }
    });
}
exports.default = validateProjectBody;
