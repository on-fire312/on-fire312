//written by oscar
//this handles everything to do with things that need to be clicked (bar the words). eg:looks, location, and how to register clicks.
class button extends textBox {
  constructor(nX, nY, nW, nH, nText, nSize) {
    // to construct button
    super(nX, nY, nW, nH, nText, nSize)
    this.overpressed = 0;
  }

  show() {
    //draws text on top of buttons
    this.ref();
    textAlign(CENTER);
    textSize(this.size);

    strokeWeight(5);
    stroke(200, 200, 200);

    if (customColor != 1) {
      if (this.hoverCheck() != 1) {
        fill(255, 255, 255);
      } else {
        fill(222, 222, 222)
      }

    }
    rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
    noStroke();
    fill(0);
    text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yBottom - this.yHeight / 4);
  }



  clickCheck() {
    //checks if mouse is being held on button
    this.ref();

    if (this.overpressed == 1 && mouseIsPressed == true) {

      return (1);
    } else {
      this.overpressed = 0;

    }
    if ((mouseX <= this.XRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom||touchX <= this.XRight && touchX >= this.xLeft && touchY >= this.yTop && touchY <= this.yBottom) && mouseIsPressed == false) {
      this.overpressed = 1;
    }
    return (0);

  }
  singleClickCheck() {
    //checks if mouse has been pressed then released over button
    this.ref();
    if (this.overpressed == 1 && mouseIsPressed == true) {
      this.overpressed = 0;
      return (1);
    } else {
      this.overpressed = 0;

    }
    if ((mouseX <= this.XRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom||touchX <= this.XRight && touchX >= this.xLeft && touchY >= this.yTop && touchY <= this.yBottom) && mouseIsPressed == false) {
      this.overpressed = 1;
    }
    return (0);

  }
  hoverCheck() {
    this.ref();
    if (mouseX <= this.XRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
      return (1);
    } else {
      return (0);
    }

  }
}


