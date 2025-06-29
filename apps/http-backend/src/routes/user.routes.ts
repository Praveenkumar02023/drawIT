import { Router } from "express";
import { createRoom, getMessages, signin, signup } from "../controllers/controller";
import { authMiddlware } from "../middlewares/auth.middleware";

export const userRouter : Router =  Router();

userRouter.post('/signup',signup);
userRouter.post('/signin',signin);
userRouter.get('/create-room',authMiddlware,createRoom);
userRouter.get('/chats/:id',authMiddlware,getMessages);