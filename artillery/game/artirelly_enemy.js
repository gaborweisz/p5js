/**
* Artirelly Enemy
*/

class EnemyArtirelly {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.draw();
    this.blased = false;
  }
  
  isHit(pos_x,pos_y) {
    let shift = CANVAS_H - TRANSLATE_Y; //differenc between the coordinate translation of projectile and hills
      let y = this.posY;
      print (pos_x,pos_y, this.posX , this.posY )
      if (this.posX < pos_x + 30 && this.posX > pos_x - 30 && this.posY < pos_y + 30 && this.posY > pos_y - 30 ) {
       
        print ("artirelly blasted" )
        return true;
      }

  }
  
  blast() {
    this.blasted = true;
  }
  
  drawNormal() {
    push()
    translate(TRANSLATE_X, TRANSLATE_Y) * -1;
    stroke("black");
    fill("black");
    strokeWeight(4);
    rect(this.posX - 30, this.posY - 20, 50, 20, 2);
    fill("rgb(34,37,34)");
    rect(this.posX - 50, this.posY, 115, 30, 15);
    strokeWeight(15);
    stroke("black");
    for (let i = 16; i < 110; i += 20) {
      point(this.posX - 50 + i, this.posY + 16);
    }
    
    //gun barell
   
    stroke("rgb(70,57,57)");
    strokeWeight(15);
    line(this.posX + 40, this.posY, this.posX + 0, this.posY - 80);
    stroke("black");
    strokeWeight(25);
    line(this.posX + 40, this.posY, this.posX + 20, this.posY - 40);
    

    pop()
  }
  
  drawBlasted() {
    push()
    translate(TRANSLATE_X, TRANSLATE_Y) * -1;
    stroke("red");
    fill("red");
    strokeWeight(4);
    rect(this.posX - 30, this.posY - 20, 50, 20, 2);
    fill("rgb(34,37,34)");
    rect(this.posX - 50, this.posY, 115, 30, 15);
    strokeWeight(15);
    stroke("black");
    for (let i = 16; i < 110; i += 20) {
      point(this.posX - 50 + i, this.posY + 16);
    }
    
    //gun barell
   
    stroke("rgb(70,57,57)");
    strokeWeight(15);
    line(this.posX + 40, this.posY, this.posX + 0, this.posY - 80);
    stroke("black");
    strokeWeight(25);
    line(this.posX + 40, this.posY, this.posX + 20, this.posY - 40);
    

    pop()
  }
  

  draw() {
    if (this.blasted) {
      this.drawBlasted()
    } else {
      this.drawNormal()
    }
  }
}