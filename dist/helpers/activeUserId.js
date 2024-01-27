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
exports.ActiveUserId = void 0;
// activeUserId.js
const projectsAction_1 = require("../actions/projectsAction");
const ActiveUserId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const userExists = yield projectsAction_1.projectsActions.userExists(userId);
    if (!userExists) {
        throw new Error("User not found");
    }
    return { userId };
});
exports.ActiveUserId = ActiveUserId;
