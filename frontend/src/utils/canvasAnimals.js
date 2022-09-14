export const drawSheep = (sheep, ctx) => {
  if (!Array.isArray(sheep)) throw new Error('Sheep must be an Array!');
  sheep.forEach(({ x, y }) => {
    ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
  });
};

export const drawWolf = ({ x, y, size }, ctx) => {
  ctx.moveTo(0, 0);
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
};
