/**
* Projectile
*/

class Projectile {
  constructor(fi, v, x) {
    this.fi = fi; // the angle of projection from horizontal
    this.v = v;   // m/s initial  velocity
    this.x = x;   // horizontal component of the projectile
    this.y = this.calcY(); // vertical component of the projectile
    this.blastX = 0; // the x position where it was exploded
    this.blastY = 0; // the y position where it was exploded
    this.blasted = false;  // marks if the projectile has been blasted
  }

  move() {
    this.x += this.v / 50 + 1;
    this.y = this.calcY();
  }

  calcY() {
    return (
      -1 *
      (this.x * tan(this.fi) -
        (g * this.x * this.x) /
          (2 * this.v * this.v * cos(this.fi) * cos(this.fi)))
    );
  }
  
  blast() {
  }

  draw() {
    push()
    translate(TRANSLATE_X, TRANSLATE_Y) * -1;
    if (this.blasted == false) {
      strokeWeight(10);
      stroke("black");
      point(this.x*2, this.y*2);
    } else {
      strokeWeight(20);
      stroke("red");
      point(this.blastX, this.blastX);
    }
    pop()
  }
}