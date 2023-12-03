/**
 * Tree
 */

class Tree {
  constructor(x, y) {
    this.x = x; //x position on the canvas
    this.y = y; //y position on the canvas
    this.rotate = random(-2,2); // rotation
    this.thickness = random(3,5); //thickeness of the trunk
    this.height = random(50,70);//height of the tree
    this.branches = random(5,this.height/10); //number of branches
  }

  draw() {
    push();
    
    translate(this.x, (this.y + 50)*-1);
    rotate(this.rotate);
    strokeWeight(4);
    //trunk
    stroke(84, 68, 22);
    strokeWeight(this.thickness);
    line(0,0,0,this.height );
    //branches
    stroke(16, 56, 8);
    strokeWeight(3);
    for(let i = 0 ; i < this.branches*7; i +=7) {
      line(0, 0 + i, i/2,10 + i );
      line(0, 0 + i, -1*i/2,10 + i );
    }
    
    pop();
  }
}
