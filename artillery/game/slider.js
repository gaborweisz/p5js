/**
* Slider with text
*/

class SliderWithText{
  
  constructor(min, max, def, x, y) {
    this.slider = createSlider(min, max, def);
    this.slider.position(x,y);
    this.slider.style("width", "100px");
    this.PosX = x;
    this.PosY = y;
    
  }
  
  value() {
    return this.slider.value();
  }
  
  drawText() {
    textSize(100);
    fill("orange")
    noStroke();
    textFont('Verdana', 35);
    text(this.slider.value(), this.PosX+35, this.PosY + 50);
     
  }
}
