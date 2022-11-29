//Written by Oscar Hitchcock-Smith
//This is the code for the textBox class. This is used to standardize how text and buttons look in the game and allows for easier changes.
class textBox {
  constructor(nX, nY, nW, nH, nText, nSize) {
    // to construct button

    this.yTop = nY;
    this.xLeft = nX;
    this.yBottom = (this.yTop + this.yHeight);
    this.xRight = (this.xLeft + this.xWidth);

    this.xWidth = nW;
    this.yHeight = nH;
    this.tex = nText;
    this.size = nSize;

  };

  show() {

    //draws text on top of buttons
    this.ref();
    textAlign(CENTER);
    textSize(fontScale*this.size);

    strokeWeight(5);
    stroke(200, 200, 200);

    fill(255, 255, 255);
    rect(this.xLeft, this.yTop, this.xWidth, this.yHeight, 10);
    noStroke();
    fill(0);
    text(this.tex, (this.xLeft + (this.xWidth / 2)), this.yTop+this.yHeight/2+this.size/3.2);
  };
  move(nX, nY) {
    if (nX != null) {
      this.xLeft = nX;
    };
    if (nY != null) {
      this.yTop = nY;
    };
 

    this.ref();
  };
  changeText(nText) {
    this.tex = nText;
  };
  ref() {
    this.yBottom = (this.yTop + this.yHeight);
    this.xRight = (this.xLeft + this.xWidth);
  };

};


