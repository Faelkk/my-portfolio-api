// activeUserId.js
import { projectsActions } from "../actions/projectsAction";

export const ActiveUserId = async (req) => {
    const userId = req.userId;

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const userExists = await projectsActions.userExists(userId);

    if (!userExists) {
        throw new Error("User not found");
    }

    return { userId };
};
