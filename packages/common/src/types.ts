
import {z} from 'zod'
export const signupValidator = z.object({

    name : z.string(),
    email : z.string().email(),
    password : z.string()
    
});

export const signinValidator = z.object({
    email : z.string().email(),
    password : z.string()
});

export const createRoomValidator = z.object({
    adminId : z.string(),
    slug : z.string()
})