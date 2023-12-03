/**
 * Hill
 */

class Hill {
  constructor(rangeHigh, rangeLow, width) {
    this.rangeHigh = rangeHigh; //top of the hill in the canvas
    this.rangeLow = rangeLow; //lowest point of the hill valley in the canvas
    this.width = width;
    this.hillRange = [];
    this.trees = [];
    this.generateHill();
    this.generateTrees();
  }
  
  isHit(pos_x,pos_y) {
    for (let x = 0; x <= this.width; x += 1) {
      let y = this.hillRange[x];
      if (pos_x == x && pos_y ==y) {
        return true;
      }
    }
  }

  generateHill() {
    let up = true;
    let y = 0;
    let y_high = random(300, 400);
    let y_100 = random(50, 100);
    let y_200 = random(50, 200);
    let y_300 = random(200, 300);

    for (let x = 0; x <= this.width; x += 1) {
      if (x == 200) {
        y = y_100;
      } else if (x == 300) {
        y = y_200;
      } else if (x == 400) {
        y = y_300;
      } else if (x == 500) {
        y = y_high;
      }

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

      this.hillRange[x] = y + this.addNoise(x);
    }
  }

  generateTrees() {
    for (let x = 0; x <= this.width; x += 1) {
      let y = this.hillRange[x];
      if (x > 150 && random(20) > 19) {
        this.trees[x] = new Tree(x, random(20, y));
      } else {
        this.trees[x] = 0;
      }
    }
  }
  
  drawHill() {
    
    for (let x = 0; x <= this.width; x += 1) {
      stroke(156, 191, 67);
      let y = this.hillRange[x];
      line(x, 0, x, y * -1);
    }

  }

  drawTrees() {
    for (let x = 0; x <= this.width; x += 1) {
      let tree = this.trees[x];

      if (tree != 0) {
        tree.draw();
      }
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

    this.drawHill();
    this.drawTrees();
    
    pop();
  }
}
