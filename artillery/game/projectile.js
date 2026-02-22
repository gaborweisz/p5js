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
    this.x += this.v / 20 + 1;
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
    this.blasted = true;
    this.blastX = this.x;
    this.blastY = this.y;
    print("blasted")

  }

  draw() {
    push()
    translate(TRANSLATE_X, TRANSLATE_Y) * -1;
    if (this.blasted == false) {
      if (this.x < 100 && this.x > 50) {
        strokeWeight(20);
        stroke("orange");
        point(this.x, this.y);
      } else {
        strokeWeight(10);
        stroke("black");
        point(this.x, this.y);
      }
    } else {
      strokeWeight(20);
      stroke("red");
      circle(this.blastX, this.blastY, 30);
    }
    pop()
  }
}