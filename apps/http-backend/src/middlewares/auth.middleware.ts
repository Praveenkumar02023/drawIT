import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
export interface AuthRequest extends Request{
    userId : string
}

export const authMiddleware : RequestHandler  =( async (req : AuthRequest,res : Response,next : NextFunction)  => {


    const authHeader = req.headers.authorization;
    console.log("authHeader =>", authHeader); // Add this

    if(!authHeader || !authHeader.startsWith('Bearer ')){

        return res.status(400).json({message : "token not found"});

    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    
    try {
        
        const isValid = jwt.verify(token!,JWT_SECRET) as {userId : string};

        if(!isValid){
            throw new Error("token not valid");
        }

        req.userId = isValid.userId;

        next();

    } catch (error) {
        return res.status(407).json({message : (error as Error).message || "Internal server error"});
    }
}) as RequestHandler