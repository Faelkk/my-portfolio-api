import validateEmail from "../utils/emailValidation";
import { MyIncomingMessage, MyServerResponse } from "../types/types";
import validatePassword from "../utils/validatePassword";
import { usersActions } from "../actions/usersActions";

interface UserRequestBody {
    email?: string;
    password?: string;
    name?: string;
}

const usersController = {
    async signin(req: MyIncomingMessage, res: MyServerResponse) {
        const { email, password } = req.body as UserRequestBody;

        if (!email || !password)
            return res.send!(400, { error: "Email and password are required" });

        if (!validatePassword(password))
            return res.send!(400, {
                error: "Password needs to be at least 8 characters",
            });

        if (!validateEmail(email!))
            return res.send!(400, { error: "Invalid email address" });

        try {
            const accessToken = await usersActions.signin(email, password);

            return res.send!(200, { accessToken });
        } catch (error) {
            return res.send!(400, { error: error.message });
        }
    },

    async signup(req: MyIncomingMessage, res: MyServerResponse) {
        const { email, name, password } = req.body as UserRequestBody;

        if (!email || !name || !password)
            return res.send!(400, {
                error: "Email,name and password are required",
            });

        if (!validateEmail(email))
            return res.send!(400, { error: "Invalid email address" });

        if (!validatePassword(password))
            return res.send(400, {
                error: "Password needs to be at least 8 characters",
            });

        try {
            const accessToken = await usersActions.signup(
                email,
                name,
                password
            );

            return res.send!(200, { accessToken });
        } catch (error) {
            return res.send!(400, { error: error.message });
        }
    },
};
export default usersController;
