import { Router } from "express";
import { createRoom, getMessages, signin, signup } from "../controllers/controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const userRouter : Router =  Router();

userRouter.post('/signup',signup);
userRouter.post('/signin',signin);
userRouter.post('/create-room',authMiddleware,createRoom);
userRouter.get('/chats/:id',authMiddleware,getMessages);