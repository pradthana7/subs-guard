import {Router} from "express";

import authorize from "../middlewares/auth.middleware.js";
import {getUser, getUsers} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get('/',getUsers);
userRoutes.get('/:id',authorize, getUser);

export default userRoutes;