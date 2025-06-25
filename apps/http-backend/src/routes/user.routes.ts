import { Router } from "express";
import { createRoom, signup } from "../controllers/user.controller";

export const userRouter : Router =  Router();

userRouter.post('/signup',signup);
userRouter.post('/signin',signup);
userRouter.get('/create-room',createRoom);
