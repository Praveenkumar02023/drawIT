"use client";

import {  handleEvents } from "../../canvasUtils/page";
import { drawAllShapes } from "../../canvasUtils/page";
import { useEffect, useRef } from "react";


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

export interface shapeType{

  type : "rect" | "circle"

  rect? : rect
  circle? : circle
}



const ChatRoom = () => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<shapeType[]>([]);
  const startX = useRef(0);
  const startY = useRef(0);
  const mouseDown = useRef(false);
  const shapeType = useRef<"rect" | "circle">("rect");

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
      shapeType
    );

   return cleanup

  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden gap-4 p-4 bg-gray-100">
      <div className="flex gap-4" >
        <button className="h-10 w-24 rounded-lg bg-gray-700 text-white" onClick={() => {shapeType.current = "rect"}} >Rectangle</button>
        <button className="h-10 w-24 rounded-lg bg-gray-700 text-white" onClick={() => {shapeType.current = "circle"}} >Circle</button>
      </div>
      <canvas ref={canvasRef} className="h-full w-full border-block"></canvas>
    </div>
  );
};

export default ChatRoom;
