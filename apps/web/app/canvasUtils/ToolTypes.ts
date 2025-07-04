export interface rect{
  x:number,
  y:number,
  height:number,
  width:number
}

export interface circle{
  x:number,
  y:number,
  radius:number,
}

export interface pencilPath{
  x:number,
  y:number
}

export interface line{
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number
}


export type toolType = "rect" | "circle" | "pencil" | "line" | "arrow";

export interface displayShapeType{

  type : toolType

  rect? : rect
  circle? : circle
  pencilPath? : pencilPath[]
  linePoints? : line
  arrowPoints? :line
  
}
