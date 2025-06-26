import { RequestHandler, Router } from "express";
import { createRoom, signup } from "../controllers/user.controller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const userRouter : Router =  Router();

userRouter.post('/signup',signup);
userRouter.post('/signin',signup);
userRouter.get('/create-room',authMiddlware,createRoom);
