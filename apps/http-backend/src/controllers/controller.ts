import  { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"
import { signupValidator , signinValidator , createRoomValidator} from "@repo/common"

import { prisma } from "@repo/db/prisma"


export const signup = async(req : Request , res : Response) :Promise<any> =>{

    const parsed = signupValidator.safeParse(req.body);

    console.log(req.body);
    if(!parsed.success){
        
        return res.status(400).json({message : "Invalid inputs :("});

    }

    const {name , email , password} = parsed.data;

    const hashedPassword = await bcrypt.hash(password,10);


    try {
        
        const user = await prisma.user.findUnique({where : {email}});
        
        if(user){
            return res.status(400).json({message : "User already Exists!"});
        }
        
        //save in db 
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                password : hashedPassword
            }
        });

        const token = jwt.sign({userId : newUser.id},JWT_SECRET);
        
        res.status(200).json({message : "Sign Up successfull",token , newUser});

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
        const user = await prisma.user.findUnique({where : {email}})

        if(!user){
            res.status(400).json({message : "user not found"});
        }

        const isVerified = await bcrypt.compare(password,user!.password);

        if(!isVerified){
            return res.status(400).json({message : "Incorrect Password"});
        }

        //token
        const token = jwt.sign({userId : user?.id},JWT_SECRET);

        res.status(200).json({message : "Signin successfull.",token});

    } catch (error) {

        res.status(500).json({message : (error as Error).message  || "Internal server error"});

    }

}



export const createRoom = async(req: Request ,res : Response) : Promise<any>  => {

    const parsed = createRoomValidator.safeParse(req.body);

    console.log(req.body);
    if(!parsed.success){
        
        return res.status(400).json({message : "invalid Room details"})

    }

    // return res.status(200).json({message : "done"});

    const adminId = (req as any).userId as string;
    console.log(adminId);
    
    const slug = parsed.data.slug;

    try {
        

        const room = await prisma.room.findUnique({where : {slug : slug}});



        if(room){

            return res.status(200).json({
                message: "Room already exists",
                roomId: room.id,
                alreadyExists: true
            });

            
        }

        const newRoom = await prisma.room.create({
            data : {
                slug ,
                adminId
            }
        });

        const roomId = (newRoom.id);

        res.status(200).json({message : "Room created!",roomId});

   } catch (error: any) {
  console.error("🔥 Error creating room:", error);

  return res.status(500).json({
    message:  "something went wrong",
    stack: error.stack,
  });
}


   
}

export const getMessages = async(req : Request , res : Response) : Promise<any> => {

    const roomId = Number(req.params.id);

    try {

        const messages = await prisma.chat.findMany({
            where : { roomId },
            take : 50
        },
    );
        
        res.status(200).json({message : "messages fetched" , messages});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : (error as Error).message || "something went wrong"});

    }

}
