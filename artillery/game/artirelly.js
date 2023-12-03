/**
* Artirelly
*/

class Artirelly {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.draw();
  }

  draw() {
    push()
    translate(TRANSLATE_X, TRANSLATE_Y) * -1;
    stroke("black");
    fill("brown");
    strokeWeight(4);
    rect(this.posX + 30, this.posY - 20, 50, 20, 2);
    fill("green");
    rect(this.posX - 20, this.posY, 115, 30, 15);
    strokeWeight(15);
    stroke("black");
    for (let i = 16; i < 110; i += 20) {
      point(this.posX - 20 + i, this.posY + 16);
    }
    
    //gun barell
    rotate(angleSlider.value() * -1);
    strokeWeight(25);
    line(this.posX + 10, this.posY, this.posX + velocitySlider.value() / 1.5 , this.posY);
    strokeWeight(15);
    line(this.posX + 10, this.posY, this.posX + 100, this.posY);
    pop()
  }
}