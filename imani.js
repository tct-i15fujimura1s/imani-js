class IMani {
  constructor(width = 0, height = 0) {
    const c = this.canvas = document.createElement("canvas");
    [c.width, c.height] = [width, height];
    this.context = c.context;
  }
  
  get width() {
    return this.canvas.width;
  }
  
  set width(width) {
    this.setSize(width, null);
  }
  
  get height() {
    return this.height.height;
  }
  
  set height(height) {
    this.setSize(null, height);
  }
  
  get image() {
    const i = new Image();
    i.src = URL.createObjectURL(this.canvas.toBlob("image/png"));
    return i;
  }
  
  get imageData() {
    return this.context.getImageData(0, 0, this.width, this.height);
  }
  
  set imageData(data) {
    this.context.putImageData(data, 0, 0);
  }
  
  setSize(width = null, height = null) {
    const data = this.imageData;
    if(typeof width  === "number") this.canvas.width  = width;
    if(typeof height === "number") this.canvas.height = height;
    this.imageData = data;
  }
  
  extend(w, h) {
    if(w > this.width || h > this.height) this.setSize(w, h);
    return this;
  }
  
  put(i, x = 0, y = 0) {
    if(i instanceof HTMLImageElement || i instanceof HTMLCanvasElement || i instanceof HTMLVideoElement) {
      this.extend(x + i.width, y + i.height);
      this.context.drawImage(i, x, y);
    } else if(i instanceof ImageData) {
      this.extend(x + i.width, y + i.height);
      this.context.putImageData(i, x, y);
    } else if(i instanceof IMani) {
      return this.put(i.canvas, x, y);
    }
    return this;
  }
}
