"use client"


import {Circle, LucideProps, Minus, Pen, Pencil, Square} from 'lucide-react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { DisplayTool } from './DisplayTool';
import { toolType } from "../canvasUtils/ToolTypes";


interface toolbarProps {
  setSelectedTool : Dispatch<SetStateAction<toolType>>,
  selectedTool : toolType
}

export const Toolbar = ({setSelectedTool , selectedTool } : toolbarProps) => {
  
  return (
    
        <div className='py-8 flex flex-col  h-full w-fit border-r justify-start gap-y-4 px-4'>

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

          <DisplayTool 
          onClick={()=>setSelectedTool("line")} 
          toolName={"line"} 
          selectedTool={selectedTool}
          Icon={Minus}
         />

        </div>
  )
}

export default Toolbar
