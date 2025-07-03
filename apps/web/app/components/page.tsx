"use client"


import {Circle, LucideProps, Pen, Pencil, Square} from 'lucide-react'
import React, { useRef, useState } from 'react'
import { DisplayTool } from './DisplayTool';

type toolType = "rect" | "circle" | "pencil" ;

export const Toolbar = () => {

  const [selectedTool,setSelectedTool] = useState<toolType>('rect');
    
  
  return (
    <div className='h-screen'>
        <div className='py-8 flex flex-col  h-full w-fit border-r justify-start gap-y-4 px-6'>

         <DisplayTool 
          onClick={()=>setSelectedTool("rect")} 
          toolName={"rect"} 
          selectedTool={selectedTool}
          Icon={Square}
         />

         <DisplayTool 
          onClick={()=>setSelectedTool("circle")} 
          toolName={"circle"} 
          selectedTool={selectedTool}
          Icon={Circle}
         />

         <DisplayTool 
          onClick={()=>setSelectedTool("pencil")} 
          toolName={"pencil"} 
          selectedTool={selectedTool}
          Icon={Pencil}
         />
         

        </div>
    </div >
  )
}

export default Toolbar
