"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [slug,setSlug] = useState('');
  
  const router = useRouter();


  return (
    <>
      <div className="p-10 h-[40%] w-[100%] flex justify-center items-center ">
        <input
          onChange={
            (e) => {
              setSlug(e.target.value);   
            }
          }
          type="text"
          className="h-10 w-[50%] bg-gray-600 text-white rounded-xl px-4 "
          placeholder="room name"
        />
        <button className="bg-gray-900 h-10 rounded-xl text-white px-4 hover:bg-gray-600 hover:animate-pulse"
        onClick={
          () => {
            if(!slug) return;

            router.push(`/room/${slug}`);

          }
        }
        >
          Join Room
        </button>
      </div>
    </>
  );
}
