import Sheep from '../Sheep/Sheep';

export default class Wolf {
  private x;
  private y;
  private size = 15;
  private readonly speed = 7;
  private readonly maxHeight;
  private readonly maxWidth;

  constructor(maxWidth, maxHeight) {
    this.x = Math.floor(Math.random() * maxWidth);
    this.y = Math.floor(Math.random() * maxHeight);
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  catchSheep(sheep: Sheep[]) {
    const nearestSheep = sheep.reduce<{
      x: number | null;
      y: number | null;
      distance: number | null;
      index: number | null;
    }>(
      (acc, sp, index) => {
        const sheepPos = sp.getPos();
        const distance = Math.sqrt(
          (sheepPos.x - this.x) ** 2 + (sheepPos.y - this.y) ** 2,
        );
        if (distance < acc.distance || !acc.distance)
          return { x: sheepPos.x, y: sheepPos.y, distance, index };
        return acc;
      },
      { x: 0, y: 0, distance: null, index: null },
    );

    if (nearestSheep.distance < this.size) {
      sheep.splice(nearestSheep.index, 1);
      this.size += 0.5;
    }
    const deltaX = Math.abs(this.x - nearestSheep.x);
    const deltaY = Math.abs(this.y - nearestSheep.y);

    if (deltaY + deltaX > 0) {
      if (this.x > nearestSheep.x)
        this.x -= Math.round(this.speed * (deltaX / (deltaX + deltaY)));
      else this.x += Math.round(this.speed * (deltaX / (deltaX + deltaY)));

      if (this.y > nearestSheep.y)
        this.y -= Math.round(this.speed * (deltaY / (deltaX + deltaY)));
      else this.y += Math.round(this.speed * (deltaY / (deltaX + deltaY)));
    }

    this.y = this.y < 0 ? 0 : this.y;
    this.x = this.x < 0 ? 0 : this.x;
    this.y = this.y > this.maxHeight ? this.maxHeight : this.y;
    this.x = this.x > this.maxWidth ? this.maxWidth : this.x;
  }
}
