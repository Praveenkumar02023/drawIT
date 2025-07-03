"use client";

import {  handleEvents } from "../../canvasUtils/page";
import { drawAllShapes } from "../../canvasUtils/page";
import { useEffect, useRef, useState } from "react";
import Toolbar, { toolType } from "../../components/page";


interface rect{
  x:number,
  y:number,
  height:number,
  width:number
}

interface circle{
  x:number,
  y:number,
  radius:number,
}



 export interface displayShapeType{

  type : "rect" | "circle" | "pencil"

  rect? : rect
  circle? : circle

}



const ChatRoom = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<displayShapeType[]>([]);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const mouseDown = useRef(false);
  const [selectedTool,setSelectedTool] = useState<toolType>('rect')
  const currentToolRef = useRef<toolType>('rect');

  useEffect(()=>{
    currentToolRef.current = selectedTool
  },[selectedTool])

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "lightslategray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    drawAllShapes(canvas,shapesRef.current,ctx);

    const cleanup = handleEvents(
      canvas,
      mouseDown,
      startX,
      startY,
      shapesRef,
      ctx,
      currentToolRef,
      lastX,
      lastY
    );

   return cleanup

  }, []);

  return (
    <div className="h-screen w-screen flex  justify-center items-center overflow-hidden bg-gray-100 ">
      <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      <canvas ref={canvasRef}  className="h-full w-full border-block"></canvas>
    </div>
  );
};

export default ChatRoom;
