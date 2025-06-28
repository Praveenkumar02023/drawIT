import { Router } from "express";
import { createRoom, signin, signup } from "../controllers/user.controller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const userRouter : Router =  Router();

userRouter.post('/signup',signup);
userRouter.post('/signin',signin);
userRouter.get('/create-room',authMiddlware,createRoom);
