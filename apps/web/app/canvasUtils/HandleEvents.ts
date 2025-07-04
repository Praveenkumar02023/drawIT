import { toolType, displayShapeType } from "../canvasUtils/ToolTypes";
import React from "react";
import { drawAllShapes } from "./DrawShape";
import { getMousePos } from "./MousePos";

export const handleEvents = (
  canvas: HTMLCanvasElement,
  mouseDown: React.RefObject<boolean>,
  startX: React.RefObject<number>,
  startY: React.RefObject<number>,
  shapesRef: React.RefObject<displayShapeType[]>,
  ctx: CanvasRenderingContext2D,
  currentTool: React.RefObject<toolType>,
  lastX: React.RefObject<number>,
  lastY: React.RefObject<number>,
  pencilPathRef: React.RefObject<{ x: number; y: number }[]>,
  ws : React.RefObject<WebSocket | null>,
  roomIdRef : React.RefObject<string | null>
) => {
  const onMouseDown = (event: MouseEvent) => {
    mouseDown.current = true;
    const { x, y } = getMousePos(event, canvas);
    startX.current = x;
    startY.current = y;

    if (currentTool.current === "pencil") {
      lastX.current = x;
      lastY.current = y;
      pencilPathRef.current.push({ x, y });
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!mouseDown.current) return;
    const { x, y } = getMousePos(event, canvas);
    const width = x - startX.current;
    const height = y - startY.current;

    if (currentTool.current !== "pencil") {
      drawAllShapes(canvas, shapesRef.current, ctx);
    }

    //for drawing rectangle

    if (currentTool.current === "rect") {
      ctx.strokeStyle = "black";
      ctx.strokeRect(startX.current, startY.current, width, height);
    }

    //for drawing circle
    else if (currentTool.current === "circle") {
      const radius = Math.sqrt(width * width + height * height);

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.arc(startX.current, startY.current, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // for drawing with pencil
    else if (currentTool.current === "pencil") {
      ctx.beginPath();
      ctx.moveTo(lastX.current, lastY.current);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();

      pencilPathRef.current.push({ x, y });

      lastX.current = x;
      lastY.current = y;
    }

    //for drawing line
    else if (currentTool.current === "line") {
      ctx.beginPath();
      ctx.moveTo(startX.current, startY.current);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
    }

    //for drawing arrow
    else if(currentTool.current === "arrow"){

      ctx.beginPath();
      ctx.moveTo(startX.current, startY.current);
      ctx.lineTo(x, y);
      
      const dx = x-startX.current;
      const dy = y-startY.current;

      const angle = Math.atan2(dy,dx);
      
      const headLen = 10
      const arrowAngle = Math.PI/6;
      
      const leftX = x - headLen * Math.cos(angle-arrowAngle);
      const leftY = y - headLen * Math.sin(angle-arrowAngle);
      const rightX = x - headLen * Math.cos(angle+arrowAngle);
      const rightY = y - headLen * Math.sin(angle+arrowAngle);

      ctx.moveTo(x,y);
      ctx.lineTo(leftX,leftY);
      
      
      ctx.moveTo(x,y);
      ctx.lineTo(rightX,rightY);
      
      ctx.stroke();
      ctx.closePath()
    }

  };

  const onMouseUp = (event: MouseEvent) => {
    if (!mouseDown.current) return;
    mouseDown.current = false;

    const { x, y } = getMousePos(event, canvas);
    const width = x - startX.current;
    const height = y - startY.current;

    if (currentTool.current === "rect") {
      const newShape: displayShapeType = {
        type: "rect",
        rect: {
          x: startX.current,
          y: startY.current,
          width,
          height,
        },
      };

      shapesRef.current.push(newShape);
      ws.current!.send(JSON.stringify({
          "type" : "chat",
          "message" : JSON.stringify(newShape),
          "roomId" : roomIdRef.current
        }));

    } else if (currentTool.current === "circle") {
      const newShape: displayShapeType = {
        type: "circle",
        circle: {
          x: startX.current,
          y: startY.current,
          radius: Math.sqrt(width * width + height * height),
        },
      };

      shapesRef.current.push(newShape);
       ws.current!.send(JSON.stringify({
          "type" : "chat",
          "message" : JSON.stringify(newShape),
          "roomId" : roomIdRef.current
        }));

    } else if (currentTool.current === "pencil") {
      const newShape: displayShapeType = {
        type: "pencil",
        pencilPath: [...pencilPathRef.current],
      };

      shapesRef.current.push(newShape);
        ws.current!.send(JSON.stringify({
          "type" : "chat",
          "message" : JSON.stringify(newShape),
          "roomId" : roomIdRef.current
        }));
      pencilPathRef.current = [];


    } else if (currentTool.current === "line") {
      const newShape: displayShapeType = {
        type: "line",
        linePoints: {
          x1: startX.current,
          y1: startY.current,
          x2: x,
          y2: y,
        },
      };

      shapesRef.current.push(newShape);
       ws.current!.send(JSON.stringify({
          "type" : "chat",
          "message" : JSON.stringify(newShape),
          "roomId" : roomIdRef.current
        }));
    }
    
    else if(currentTool.current === "arrow"){


      const newShape: displayShapeType = {
        type: "arrow",
        arrowPoints: {
          x1: startX.current,
          y1: startY.current,
          x2: x,
          y2: y,
        },
      };

      shapesRef.current.push(newShape);
        ws.current!.send(JSON.stringify({
          "type" : "chat",
          "message" : JSON.stringify(newShape),
          "roomId" : roomIdRef.current
        }));
    }

    drawAllShapes(canvas, shapesRef.current, ctx);
  };

  // Add event listeners
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);

  // Return cleanup function
  return () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
  };
};
