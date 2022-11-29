//Written by Oscar Hitchcock-Smith
//This is the code for the button class, inheriting from the text box class, this contains al the code needed for the display and behavior of almost all intractable objects in game.
class button extends textBox {
  constructor(nX, nY, nW, nH, nText, nSize) {
    // to construct button
    super(nX, nY, nW, nH, nText, nSize);
    this.overpressed = 0;
  };

  show() {
    //draws text on top of buttons
    this.ref();
    textAlign(CENTER);
    textSize(fontScale*this.size*canvasRatio);

    strokeWeight(5);
    stroke(200, 200, 200);

    if (customColor != 1) {
      if (this.hoverCheck() != 1) {
        fill(255, 255, 255);
      } else {
        fill(222, 222, 222);
      };

    };
    rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
    noStroke();
    fill(0);
    text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yTop+this.yHeight/2+this.size/3.2);
  };



  clickCheck() {
    //checks if mouse is being held on button
    this.ref();

    if (this.overpressed == 1 && mouseIsPressed == true) {

      return (1);
    } else {
      this.overpressed = 0;

    };
    if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom  && mouseIsPressed == false) {
      this.overpressed = 1;
    };
    return (0);

  };
  singleClickCheck() {
    //checks if mouse has been pressed then released over button
    this.ref();
    if (this.overpressed == 1 && mouseIsPressed == true) {
      this.overpressed = 0;
      return (1);
    } else {
      this.overpressed = 0;

    };
    if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom   && mouseIsPressed == false) {
      this.overpressed = 1;
    };
    return (0);

  };
  hoverCheck() {
    this.ref();
    if (mouseX <= this.xRight && mouseX >= this.xLeft && mouseY >= this.yTop && mouseY <= this.yBottom && mouseIsPressed == false) {
      return (1);
    } else {
      return (0);
    };

  };


};
