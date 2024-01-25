export const ActiveUserId = (req, res) => {
    const userId = req.userId;

    if (!userId) {
        res.send(400, { error: "unauthorized" });
    }

    return userId;
};
