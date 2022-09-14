import Wolf from '../wolf/Wolf';

export default class Sheep {
  private x;
  private y;
  private readonly speed = 2;
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

  run(wolf: Wolf) {
    const WolfPos = wolf.getPos();
    const deltaX = Math.abs(this.x - WolfPos.x);
    const deltaY = Math.abs(this.y - WolfPos.y);

    if (deltaY + deltaX > 0) {
      if (this.x > WolfPos.x)
        this.x += Math.round(this.speed * (deltaX / (deltaX + deltaY)));
      else this.x -= Math.round(this.speed * (deltaX / (deltaX + deltaY)));

      if (this.y > WolfPos.y)
        this.y += Math.round(this.speed * (deltaY / (deltaX + deltaY)));
      else this.y -= Math.round(this.speed * (deltaY / (deltaX + deltaY)));
    }

    this.y = this.y < 0 ? 0 : this.y;
    this.x = this.x < 0 ? 0 : this.x;
    this.y = this.y > this.maxHeight ? this.maxHeight : this.y;
    this.x = this.x > this.maxWidth ? this.maxWidth : this.x;
  }
}
