import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/JWT_SECRET"
import { signupValidator , signinValidator } from "@repo/common/signupValidator"





export const signup = async(req : Request , res : Response) :Promise<any> =>{

    const parsed = signupValidator.safeParse(req.body);

    if(!parsed.success){

        return res.status(400).json({message : "Invalid inputs :("});

    }

    const {firstName , lastName , email , password} = parsed.data;

    const hashedPassword = await bcrypt.hash(password,10);


    try {
        //save in db 
        
        const token = jwt.sign({userId : "123"},JWT_SECRET);
        
        res.status(200).json({message : "Sign Up successfull",token});

    } catch (error) {

        res.status(500).json({message : "Internal server error"});

    }
}
export const signin = async(req : Request , res : Response) : Promise<any> =>{
    
    const parsed = signinValidator.safeParse(req.body);

     if(!parsed.success){

        return res.status(400).json({message : "Invalid inputs :("});

    }

    const {email , password} = parsed.data;

    try {

        //get user
        const user = {password : "2334"};

        const isVerified = await bcrypt.compare(password,user.password);

        if(!isVerified){
            return res.status(400).json({message : "Incorrect Password"});
        }

        //token
        const token = jwt.sign({userId : 123},JWT_SECRET);

        res.status(200).json({message : "Signin successfull.",token});

    } catch (error) {

        res.status(500).json({message : "Internal server error"});

    }

}

function generateRoom() : string {
    
    const alphaNum = 'abcdefghijklmnopqrstuvwxyz1234567890';

    let roomId = ''; 
    const len = 8;

    for (let i = 0; i < len; i++) {
    roomId += alphaNum.charAt(Math.floor(Math.random() * alphaNum.length));
    }

    return roomId;
}

export const createRoom = async(req: Request ,res : Response)  => {
    
    
    let isUnique  = false;

    let roomID = '';

    while(!isUnique){

        roomID = generateRoom();

        //serch in DB
        const exists : string = '';
        if(!exists) isUnique = true; 
    }
   
    res.status(200).json({message : "code generated successfully!",roomID});
}