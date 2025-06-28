import {z} from 'zod'
export const signupValidator = z.object({

    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string()
});

export const signinValidator = z.object({
    email : z.string().email(),
    password : z.string()
});