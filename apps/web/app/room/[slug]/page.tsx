"use client";

import { handleEvents } from "../../canvasUtils/HandleEvents";
import { drawAllShapes } from "../../canvasUtils/DrawShape";
import { useEffect, useRef, useState } from "react";
import { toolType } from "../../canvasUtils/ToolTypes";
import { displayShapeType } from "../../canvasUtils/ToolTypes";
import Toolbar from "../../components/Toolbar";
import { useSocket } from "../../hooks/useSocket";
import { useParams } from "next/navigation";
import axios from "axios";

const ChatRoom = () => {
  const slug = useParams().slug as string;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //array to hold the current canvas shapes.
  const shapesRef = useRef<displayShapeType[]>([]);

  //start point of the drawing.
  const startX = useRef(0);
  const startY = useRef(0);

  //last point of the drawing
  const lastX = useRef(0);
  const lastY = useRef(0);

  //drawing or not.
  const mouseDown = useRef(false);

  const [selectedTool, setSelectedTool] = useState<toolType>("rect");
  const currentToolRef = useRef<toolType>("rect");
  const pencilPathRef = useRef<{ x: number; y: number }[]>([]);
  const roomIdRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    currentToolRef.current = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "lightslategray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const token = localStorage.getItem("jwt_token")!;

    const init = async () => {
      await getRoomId(slug, token, roomIdRef);
      if (!roomIdRef.current) return;
      
      const ws = useSocket(token, roomIdRef.current);

      if(ws){

        wsRef.current = ws

      }

      drawAllShapes(canvas, shapesRef.current, ctx);
      
      const cleanupEvents = handleEvents(
        canvas,
        mouseDown,
        startX,
        startY,
        shapesRef,
        ctx,
        currentToolRef,
        lastX,
        lastY,
        pencilPathRef,
        wsRef,
        roomIdRef
      );

      return () => {
    if (ws) {
      ws.close();
    }

    if (cleanupEvents) {
      cleanupEvents();
    }
  };
    };

    init()
  }, []);

  return (
    <div className="h-screen w-screen flex  justify-center items-center overflow-hidden bg-gray-100 ">
      <Toolbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      <canvas ref={canvasRef} className="h-full w-full border-block"></canvas>
    </div>
  );
};

export default ChatRoom;

async function getRoomId(
  slug: string,
  token: string,
  roomIdRef: React.RefObject<string | null>
) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/create-room",
      {
        slug: slug,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response) return;

    roomIdRef.current = response.data.roomId;
  } catch (error) {
    console.log(error);
  }
}
