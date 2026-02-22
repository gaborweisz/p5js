let g = 9.8; // gravitational acceleration
let artirelly; // artilelly unit
let enemyArtirelly; // enemy artirelly unit
let angleSlider; // can set the angle of the gun barell
let mountain; // high mountain in the background
let cloud; //cloud
let velocitySlider; // can set the velocity of the projectile
let projectile = 0; // projectile
let TRANSLATE_X = 50; //shifts the coordinate system left
let TRANSLATE_Y = 750; //shifts the coordinate system down
let CANVAS_W = 2000; // width of the canvas
let CANVAS_H = 800; // height of the canves

function setup() {
  background("lightblue");
  angleMode(DEGREES);
  createCanvas(CANVAS_W, CANVAS_H);
  angleSlider = new SliderWithText(20, 80, 45, 10, 10);
  velocitySlider = new SliderWithText(75, 200, 120, 150, 10);
  mountain = new Mountain(
    CANVAS_H - 100,
    CANVAS_H - 300,
    CANVAS_H - 180,
    CANVAS_W
  );
  hill = new Hill(CANVAS_H - 300, CANVAS_H - 500, CANVAS_W);
  hill.draw();
  cloud = new Cloud(
    CANVAS_H - 100,
    CANVAS_H - 300,
    0,
    CANVAS_H - 100,
    400,
    10,
    1
  )
  artirelly = new Artirelly(0, 0);
  let enemy_x = int(random(CANVAS_W * 0.6, CANVAS_W - 100));
  let enemy_y = -1 * int(hill.getHeight(enemy_x)) + 50
  enemyArtirelly = new EnemyArtirelly(enemy_x,  enemy_y);
}

function draw() {
  background("lightblue");
  mountain.draw();
  hill.draw();
  cloud.draw();
  cloud.move()

  angleSlider.drawText();
  velocitySlider.drawText();

  if (projectile != 0) {
    if (projectile.blasted == false) {
      projectile.move();

      if (hill.isHit(projectile.x, projectile.y)) {
        projectile.blast();
      }
      
      if (enemyArtirelly.isHit(projectile.x, projectile.y)) {
        enemyArtirelly.blast();
      }
      
    }

    projectile.draw();
  }

  artirelly.draw(); 
  enemyArtirelly.draw();
  
}


function keyPressed() {
  projectile = new Projectile(angleSlider.value(), velocitySlider.value(), 0);
  print(angleSlider.value(), velocitySlider.value());
}
