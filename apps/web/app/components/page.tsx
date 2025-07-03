"use client"


import {Circle, Pencil, Square} from 'lucide-react'
import { useRef, useState } from 'react'


export const Toolbar = () => {

  const [selectedTool,setSelectedTool] = useState<"rect" | "circle" | "pencil" | null>(null);
    

  return (
    <div className='h-screen'>
        <div className='py-8 flex flex-col  h-full w-fit border-r justify-start gap-y-4 px-6'>

          <div onClick={() => {
            setSelectedTool("rect")
          }} className={`rounded-md p-1.5 ${selectedTool === "rect" ? "bg-blue-100 text-blue-500" : "text-gray-700"}`
}>
            <Square/>
          </div>

          <div onClick={() => {
            setSelectedTool("circle")
          }} className={`rounded-md p-1.5 ${selectedTool === "circle" ? "bg-blue-100 text-blue-500" : "text-gray-700"}`
}>
            <Circle/>
          </div>

         <div onClick={() => {
           setSelectedTool("pencil")
          }} className={`rounded-md p-1.5 ${selectedTool === "pencil" ? "bg-blue-100 text-blue-500" : "text-gray-700"}`
}>
           <Pencil/>
         </div>

        </div>
    </div >
  )
}

export default Toolbar