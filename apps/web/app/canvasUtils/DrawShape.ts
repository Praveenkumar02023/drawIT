import { displayShapeType } from "./ToolTypes"

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
    } 
    
    else if (shape.type === "circle" && shape.circle) {
      const { x, y, radius } = shape.circle;
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    }

    else if(shape.type === "pencil" && shape.pencilPath){

      const points = shape.pencilPath;

      let current = points[1] , prev = points[0];

      for(let i = 1 ; i < points.length ; i++){

        if(!current || !prev) return;

        ctx.beginPath();
        ctx.moveTo(prev?.x,prev?.y);
        ctx.lineTo(current.x,current.y);
        ctx.stroke()
        ctx.closePath()

        prev = current;
        current = points[i+1];

      }
    }

    else if(shape.type === "line" && shape.linePoints){

      ctx.beginPath();
      ctx.moveTo(shape.linePoints.x1,shape.linePoints.y1);
      ctx.lineTo(shape.linePoints.x2,shape.linePoints.y2);
      ctx.stroke()
      ctx.closePath()

    }
  }
};