export const getMousePos = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  const rect = canvas.getBoundingClientRect();

  const x :number = event.clientX - rect.left;
  const y:number = event.clientY - rect.top;

  return {
    x,
    y,
  };
};