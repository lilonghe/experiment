import { user } from "./models/user";
import { init } from "@rematch/core";

export const store = init({
    models: {
        user,
    }
});