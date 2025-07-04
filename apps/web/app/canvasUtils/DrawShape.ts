import { displayShapeType } from "./ToolTypes"

export const drawAllShapes = (
  canvas: HTMLCanvasElement,
  shapes: displayShapeType [],
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lightslategray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let shape of shapes) {


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

    else if(shape.type === "arrow" && shape.arrowPoints){

      const {x1,x2,y1,y2} = shape.arrowPoints

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      const dx = x2-x1;
      const dy = y2-y1;
      
      const angle = Math.atan2(dy,dx);

      const headLen = 10
      const arrowAngle = Math.PI/6;
      
      const leftX = x2 - headLen * Math.cos(angle-arrowAngle);
      const leftY = y2 - headLen * Math.sin(angle-arrowAngle);
      const rightX = x2 - headLen * Math.cos(angle+arrowAngle);
      const rightY = y2 - headLen * Math.sin(angle+arrowAngle);
      
      ctx.moveTo(x2,y2);
      ctx.lineTo(leftX,leftY);
      
      
      ctx.moveTo(x2,y2);
      ctx.lineTo(rightX,rightY);
      
      ctx.stroke();
      ctx.closePath()

    }
  }
};