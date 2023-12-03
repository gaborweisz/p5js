let g = 9.8;         // gravitational acceleration
let artirelly;       // artilelly unit 
let angleSlider;     // can set the angle of the gun barell
let mountain;        // high mountain in the background
let velocitySlider;  // can set the velocity of the projectile
let projectile = 0;  // projectile
let TRANSLATE_X = 50;  //shifts the coordinate system left
let TRANSLATE_Y = 750; //shifts the coordinate system down
let CANVAS_W = 1600;   // width of the canvas
let CANVAS_H = 800;    // height of the canves

function setup() {
  background("lightblue");
  angleMode(DEGREES);
  createCanvas(CANVAS_W, CANVAS_H);
  angleSlider = new SliderWithText(20, 80, 45, 10,10);
  velocitySlider = new SliderWithText(50, 100, 75, 150,10);
  artirelly = new Artirelly(0, 0);
  mountain = new Mountain(CANVAS_H-100, CANVAS_H-300,CANVAS_H-180,CANVAS_W);
  hill = new Hill(CANVAS_H-300, CANVAS_H-500, CANVAS_W);

}

function draw() {
  background("lightblue");
  mountain.draw();
  hill.draw();
 
  angleSlider.drawText();
  velocitySlider.drawText();
  //mountain.draw();

  if (projectile != 0) {
    projectile.move();
    projectile.draw();
    
    if (hill.isHit(projectile.x, projectile.y)) {
      projectile.blast();
    }
  }
 
  artirelly.draw();
}

function keyPressed() {
  projectile = new Projectile(angleSlider.value(), velocitySlider.value(), 0);
  print (angleSlider.value(), velocitySlider.value())
}




