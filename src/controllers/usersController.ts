import validateEmail from "../utils/emailValidation";
import { MyIncomingMessage, MyServerResponse } from "../types/types";
import validatePassword from "../utils/validatePassword";
// import { usersActions } from "../actions/usersActions";

interface UserRequestBody {
    email?: string;
    password?: string;
    name?: string;
}

const usersController = {
    async signin(req: MyIncomingMessage, res: MyServerResponse) {
        console.log(req.body);

        const { email, password } = req.body as UserRequestBody;

        if (!email || !password)
            res.send!(400, { error: "Email and password are required" });

        if (!validatePassword(password))
            res.send!(400, {
                error: "Password needs to be at least 8 characters",
            });

        if (!validateEmail(email!))
            res.send!(400, { error: "Invalid email address" });

        try {
            // const { accessToken } = await usersActions.signin(email, password);
            res.send!(200, { login: true });
        } catch (error) {
            res.send!(400, { error: "Internal server error" });
        }
    },

    async signup(req: MyIncomingMessage, res: MyServerResponse) {
        console.log(req.body);
        const { email, name, password } = req.body as UserRequestBody;

        if (!email || !name || !password)
            res.send!(400, { error: "Email,name and password are required" });

        if (!validateEmail(email!))
            res.send!(400, { error: "Invalid email address" });

        try {
            // const { accessToken } = await usersActions.signup(email, password);
            res.send!(200, { register: true });
        } catch (error) {
            res.send!(400, { error: "Internal server error" });
        }
    },
};
export default usersController;
