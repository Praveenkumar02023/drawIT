import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
    userId : string
}

export const authMiddlware : RequestHandler  =( async (req : AuthRequest,res : Response,next : NextFunction)  => {


    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){

        return res.status(400).json({message : "token not found"});

    }

    const token = authHeader.split(' ')[1];

    try {
        
        const isValid = jwt.verify(token!,process.env.JWT_SECRET!) as {userId : string};

        if(!isValid){
            throw new Error("token not valid");
        }

        req.userId = isValid.userId;

        next();

    } catch (error) {
        return res.status(400).json({message : "internal server error"});
    }
}) as RequestHandler