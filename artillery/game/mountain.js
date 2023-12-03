/**
 * Mountain
 */

class Mountain {
  constructor(rangeHigh, rangeLow, snowLimit, width) {
    this.rangeHigh = rangeHigh; //top of the mountain in the canvas
    this.rangeLow = rangeLow; //lowest point of the mointain valley in the canvas
    this.snowLimit = snowLimit; //limit of the snow in the canvas
    this.width = width;
    this.mountainRange = [];
    this.generateMountain();
  }

  generateMountain() {
    let up = true;
    let y = random(this.rangeLow, this.rangeHigh);
    for (let x = 0; x <= this.width; x += 1) {
      let step = 0.4;
      if (up) {
        y += step;
      } else {
        y -= step;
      }

      if (y > this.rangeHigh) {
        up = false;
      }

      if (y < this.rangeLow) {
        up = true;
      }

      this.mountainRange[x] = y + this.addNoise(x);
    }
  }

  addNoise(value) {
    let noiseLevel = 25;
    let noiseScale = 0.02;
    // Scale input coordinate.
    let nx = noiseScale * value;
    // Compute noise value.
    return noiseLevel * noise(nx);
  }

  draw() {
    push();
    translate(0, CANVAS_H);
    strokeWeight(4);

    for (let x = 0; x <= this.width; x += 1) {
      stroke(166, 137, 70);
      let y = this.mountainRange[x];
      line(x, 0, x, y * -1);

      stroke(247, 246, 242);
      if (y > this.snowLimit - this.addNoise(x)) {
        line(x, this.snowLimit * -1 + this.addNoise(x), x, y * -1);
      }
    }

    pop();
  }
}
