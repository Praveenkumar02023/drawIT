"use client"

import axios from 'axios'
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
const SignUp = () => {


    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const router = useRouter();


    const handleSignin = async() => {

        const response = await axios.post('http://localhost:8000/api/v1/user/signin',{
            
            email : emailRef.current?.value,
            password : passwordRef.current?.value
        });

        if(response.status == 200){

            const token = response.data.token;
            localStorage.setItem("jwt_token",token);

            router.push('/');

        }else{
            alert(response.data.message);
        }
    }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-700' >

        <div className='h-[50%] w-[45%] rounded-xl bg-white text-black p-6' >

            <div className='flex flex-col justify-center items-center' >

                <h2>Sign In</h2>

                <input type="text" ref={emailRef}  placeholder='enter email' className='px-4 my-4 h-10 w-[100%] bg-gray-600 text-white rounded-lg'/>
                <input type="text" ref={passwordRef}  placeholder='enter password' className='px-4 my-4 h-10 w-[100%] bg-gray-600 text-white rounded-lg'/>
                <button className="bg-gray-900 h-10 rounded-xl text-white px-4 hover:bg-gray-600 hover:animate-pulse" onClick={handleSignin} > SignIn </button>
            </div>

        </div>

    </div>
  )
}

export default SignUp