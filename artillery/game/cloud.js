/**
 * Cloud
 */

class Cloud {
  constructor(rangeHigh, rangeLow, pos_x, pos_y, width, transparency) {
    this.rangeHigh = rangeHigh; //top of the cloud in the canvas
    this.rangeLow = rangeLow; //lowest point of the cloud in the canvas
    this.posX = pos_x
    this.posY = pos_y
    this.width = width;
    this.transparency = transparency; //transparency of the cloud
    this.cloudRange = [];
    this.generateCloud();
  }
  
  move() {
    this.posX = this.posX + 1
  }

  generateCloud() {
    let up = true;
    let y = random(this.rangeLow, this.rangeHigh);
    for (let x = 0; x <= this.width; x += 1) {
      this.cloudRange[x] = y + this.addNoise(x);
    }
  }

  addNoise(value) {
    let noiseLevel = 150;
    let noiseScale = 0.02;
    // Scale input coordinate.
    let nx = noiseScale * value;
    // Compute noise value.
    return noiseLevel * noise(nx);
  }

  draw() {
    push();
    translate(0, CANVAS_H);
    strokeWeight(20);

    for (let x = 0; x <= this.width; x += 1) {
      stroke(255, 255, 255, this.transparency);
      let draw_x = this.posX + x 
      let draw_y = this.posY + 50;
      
      line(draw_x, this.cloudRange[x] * -1 - 100, draw_x, this.cloudRange[x] * -1);
    }

    pop();
  }
}
