export class Size {
  readonly width: number;
  readonly height: number;
  readonly scale: number;

  constructor(width: number, height: number) {
    this.width = Math.max(width, 0);
    this.height = Math.max(height, 0);
    this.scale = width > 0 && height > 0 ? width / height : 0;
  }

  minus(s: Size): Size {
    return new Size(this.width - s.width, this.height - s.height);
  }

  getScale(desiredSize: Size): number {
    if (this.width >= desiredSize.width && this.height >= desiredSize.height) {
      return 1;
    }
    let scale = 1;
    if (this.width < desiredSize.width) {
      scale = Math.min(scale, this.width / desiredSize.width);
    }
    if (this.height < desiredSize.height) {
      scale = Math.min(scale, this.height / desiredSize.height);
    }
    return scale;
  }
}
