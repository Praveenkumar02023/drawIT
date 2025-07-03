import { toolType } from "../components/page";
import { displayShapeType } from "../room/[slug]/page";
import React, { useRef } from "react";

export const getMousePos = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return {
    x,
    y,
  };
};

export const drawAllShapes = (
  canvas: HTMLCanvasElement,
  shapes: displayShapeType[],
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lightslategray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shape of shapes) {
    if (shape.type === "rect" && shape.rect) {
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.fillRect(
        shape.rect.x,
        shape.rect.y,
        shape.rect.width,
        shape.rect.height
      );
      ctx.strokeRect(
        shape.rect.x,
        shape.rect.y,
        shape.rect.width,
        shape.rect.height
      );
    } else if (shape.type === "circle" && shape.circle) {
      const { x, y, radius } = shape.circle;
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    }
  }
};

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

) => {

  const onMouseDown = (event: MouseEvent) => {
    mouseDown.current = true;
    const { x, y } = getMousePos(event, canvas);
    startX.current = x;
    startY.current = y;
   
    if(currentTool.current === "pencil"){
      lastX.current = x;
      lastY.current = y;
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!mouseDown.current) return;
    const { x, y } = getMousePos(event, canvas);
    const width = x - startX.current;
    const height = y - startY.current;

    if(currentTool.current !== 'pencil'){
      drawAllShapes(canvas, shapesRef.current, ctx);
    }
    
    //for drawing rectangle

    if (currentTool.current  === "rect") {
      
        ctx.strokeStyle = "black";
      ctx.strokeRect(startX.current,startY.current, width, height);

    } 
    
    //for drawing circle

    else if (currentTool.current === "circle") {
      
      const radius = Math.sqrt(width * width + height * height);
      
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.arc(startX.current,startY.current, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // for drawing with pencil

    else if(currentTool.current === "pencil"){

      ctx.beginPath();
      ctx.moveTo(lastX.current,lastY.current);
      ctx.lineTo(x,y);
      ctx.stroke()
      ctx.closePath()

      lastX.current = x;
      lastY.current = y;
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    if (!mouseDown.current) return;
    mouseDown.current = false;

    const { x, y } = getMousePos(event, canvas);
    const width = x - startX.current;
    const height = y - startY.current;

    if(currentTool.current === "rect"){

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

    }
    else if(currentTool.current === 'circle'){

        const newShape: displayShapeType = {
        type: "circle",
        circle: {
            x: startX.current,
            y: startY.current,
            radius : Math.sqrt(width*width + height*height)
        }
        };

        shapesRef.current.push(newShape);

    }

    else if(currentTool.current === "pencil"){

      const newShape: displayShapeType = {
        type: "circle",
        circle: {
            x: startX.current,
            y: startY.current,
            radius : Math.sqrt(width*width + height*height)
        }
        };

        shapesRef.current.push(newShape);      

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
